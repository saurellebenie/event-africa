/**
 * Centralized API Service
 * -------------------------
 * Change BASE_URL to point to the correct environment:
 *   - Local:      http://localhost:8000/api/v1
 *   - Staging:    https://staging-api.evenia.com/api/v1
 *   - Production: https://api.evenia.com/api/v1
 */

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1'

// ─── Types ──────────────────────────────────────────────
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface ApiRequestOptions {
  method?: HttpMethod
  body?: unknown
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean | undefined>
  signal?: AbortSignal
}

export interface ApiResponse<T> {
  data: T
  status: number
  ok: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  perPage: number
  totalPages: number
}

export interface ApiError {
  message: string
  code?: string
  status: number
}

// ─── Entity Types ───────────────────────────────────────
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatar?: string
  role: 'customer' | 'provider' | 'admin'
  createdAt: string
  updatedAt: string
}

export interface Provider {
  id: string
  userId: string
  businessName: string
  category: string
  description: string
  location: string
  phone: string
  email: string
  rating: number
  reviewCount: number
  verified: boolean
  kycStatus: 'pending' | 'submitted' | 'approved' | 'rejected'
  subscription: 'starter' | 'professional' | 'enterprise'
  createdAt: string
  updatedAt: string
}

export interface Service {
  id: string
  providerId: string
  providerName?: string
  title: string
  category: string
  description: string
  descriptionFr?: string
  descriptionEn?: string
  location: string
  price: number
  priceUnit: string
  currency: string
  images: string[]
  rating: number
  reviewCount: number
  amenities?: string[]
  availability?: string[]
  featured?: boolean
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
  updatedAt: string
  // Category-specific fields
  categoryData?: Record<string, unknown>
}

export interface Category {
  id: string
  name: string
  nameFr: string
  nameEn: string
  slug: string
  icon?: string
  count?: number
}

export interface Booking {
  id: string
  serviceId: string
  serviceName: string
  providerId: string
  providerName: string
  customerId: string
  customerName: string
  eventType: string
  eventDate: string
  startTime: string
  endTime: string
  guests: number
  location: string
  budget?: number
  description?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  totalAmount: number
  currency: string
  paymentStatus: 'pending' | 'paid' | 'refunded'
  createdAt: string
  updatedAt: string
  // Category-specific fields
  categoryData?: Record<string, unknown>
}

export interface Review {
  id: string
  serviceId: string
  customerId: string
  customerName: string
  customerAvatar?: string
  rating: number
  comment: string
  reply?: string
  replyAt?: string
  createdAt: string
}

export interface Transaction {
  id: string
  bookingId: string
  amount: number
  currency: string
  type: 'payment' | 'payout' | 'refund' | 'commission'
  status: 'pending' | 'completed' | 'failed'
  method: 'mobile_money' | 'card' | 'bank_transfer' | 'cash'
  reference: string
  createdAt: string
}

export interface KycRequest {
  id: string
  providerId: string
  businessName: string
  email: string
  phone: string
  category: string
  location: string
  documents: {
    businessRegistration?: string
    taxCertificate?: string
    bankProof?: string
    governmentId?: string
  }
  status: 'pending' | 'under_review' | 'approved' | 'rejected'
  rejectionReason?: string
  notes?: string
  submittedAt: string
  reviewedAt?: string
}

export interface Subscription {
  id: string
  name: string
  price: number
  currency: string
  interval: 'monthly' | 'yearly'
  commissionRate: number
  features: string[]
  maxListings: number
  recommended?: boolean
}

// ─── Utility Functions ──────────────────────────────────
function buildUrl(endpoint: string, params?: Record<string, string | number | boolean | undefined>): string {
  const url = new URL(`${BASE_URL}${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value))
      }
    })
  }
  return url.toString()
}

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token)
  }
}

function clearAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
  }
}

// ─── Core API Request Function ──────────────────────────
async function apiRequest<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
  const { method = 'GET', body, headers = {}, params, signal } = options

  const token = getAuthToken()
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  const url = buildUrl(endpoint, params)

  try {
    const response = await fetch(url, {
      method,
      headers: { ...defaultHeaders, ...headers },
      body: body ? JSON.stringify(body) : undefined,
      signal,
    })

    let data: T
    try {
      data = await response.json()
    } catch {
      data = {} as T
    }

    if (!response.ok) {
      const errorData = data as unknown as { message?: string; error?: string }
      throw {
        message: errorData.message || errorData.error || 'An error occurred',
        status: response.status,
      } as ApiError
    }

    return {
      data,
      status: response.status,
      ok: response.ok,
    }
  } catch (error) {
    if ((error as ApiError).status) {
      throw error
    }
    throw {
      message: (error as Error).message || 'Network error',
      status: 0,
    } as ApiError
  }
}

// ─── Auth API ───────────────────────────────────────────
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
}

export interface AuthResponse {
  token: string
  user: User
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiRequest<AuthResponse>('/auth/login', { method: 'POST', body: credentials })
    if (response.ok && response.data.token) {
      setAuthToken(response.data.token)
    }
    return response
  },

  register: async (data: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiRequest<AuthResponse>('/auth/register', { method: 'POST', body: data })
    if (response.ok && response.data.token) {
      setAuthToken(response.data.token)
    }
    return response
  },

  logout: async (): Promise<void> => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' })
    } finally {
      clearAuthToken()
    }
  },

  me: () => apiRequest<{ user: User }>('/auth/me'),

  forgotPassword: (email: string) =>
    apiRequest('/auth/forgot-password', { method: 'POST', body: { email } }),

  resetPassword: (data: { token: string; password: string }) =>
    apiRequest('/auth/reset-password', { method: 'POST', body: data }),

  isAuthenticated: (): boolean => !!getAuthToken(),
}

// ─── Services API ───────────────────────────────────────
export interface ServiceFilters {
  page?: number
  perPage?: number
  category?: string
  search?: string
  sort?: 'rating' | 'reviews' | 'price_asc' | 'price_desc' | 'name'
  location?: string
  minPrice?: number
  maxPrice?: number
  featured?: boolean
}

export interface CreateServiceData {
  title: string
  category: string
  description: string
  location: string
  price: number
  priceUnit: string
  currency: string
  images: string[]
  amenities?: string[]
  availability?: string[]
  categoryData?: Record<string, unknown>
}

export const servicesApi = {
  getAll: (filters?: ServiceFilters) =>
    apiRequest<PaginatedResponse<Service>>('/services', { params: filters as Record<string, string | number | boolean | undefined> }),

  getById: (id: string) =>
    apiRequest<Service>(`/services/${id}`),

  create: (data: CreateServiceData) =>
    apiRequest<Service>('/services', { method: 'POST', body: data }),

  update: (id: string, data: Partial<CreateServiceData>) =>
    apiRequest<Service>(`/services/${id}`, { method: 'PUT', body: data }),

  delete: (id: string) =>
    apiRequest<void>(`/services/${id}`, { method: 'DELETE' }),

  getFeatured: () =>
    apiRequest<Service[]>('/services/featured'),

  getByProvider: (providerId: string, params?: { page?: number; perPage?: number }) =>
    apiRequest<PaginatedResponse<Service>>(`/providers/${providerId}/services`, { params: params as Record<string, string | number | boolean | undefined> }),

  getMyServices: (params?: { page?: number; perPage?: number; status?: string }) =>
    apiRequest<PaginatedResponse<Service>>('/services/mine', { params: params as Record<string, string | number | boolean | undefined> }),
}

// ─── Providers API ──────────────────────────────────────
export interface ProviderFilters {
  page?: number
  perPage?: number
  status?: string
  search?: string
  category?: string
  verified?: boolean
}

export interface ProviderApplicationData {
  businessName: string
  category: string
  description: string
  location: string
  phone: string
  email: string
  businessRegistration: string
  taxId?: string
  bankAccount: string
  accountHolder: string
  documents: {
    businessRegistration: string
    taxCertificate?: string
    bankProof: string
    governmentId: string
  }
}

export const providersApi = {
  getAll: (filters?: ProviderFilters) =>
    apiRequest<PaginatedResponse<Provider>>('/providers', { params: filters as Record<string, string | number | boolean | undefined> }),

  getById: (id: string) =>
    apiRequest<Provider>(`/providers/${id}`),

  apply: (data: ProviderApplicationData) =>
    apiRequest<{ message: string; applicationId: string }>('/providers/apply', { method: 'POST', body: data }),

  update: (id: string, data: Partial<Provider>) =>
    apiRequest<Provider>(`/providers/${id}`, { method: 'PUT', body: data }),

  suspend: (id: string, reason: string) =>
    apiRequest<void>(`/providers/${id}/suspend`, { method: 'POST', body: { reason } }),

  activate: (id: string) =>
    apiRequest<void>(`/providers/${id}/activate`, { method: 'POST' }),

  delete: (id: string) =>
    apiRequest<void>(`/providers/${id}`, { method: 'DELETE' }),

  getProfile: () =>
    apiRequest<Provider>('/providers/me'),

  updateProfile: (data: Partial<Provider>) =>
    apiRequest<Provider>('/providers/me', { method: 'PUT', body: data }),
}

// ─── KYC API ────────────────────────────────────────────
export const kycApi = {
  getRequests: (params?: { page?: number; status?: string }) =>
    apiRequest<PaginatedResponse<KycRequest>>('/admin/kyc/requests', { params: params as Record<string, string | number | boolean | undefined> }),

  getById: (id: string) =>
    apiRequest<KycRequest>(`/admin/kyc/requests/${id}`),

  approve: (id: string, notes?: string) =>
    apiRequest<void>(`/admin/kyc/requests/${id}/approve`, { method: 'POST', body: { notes } }),

  reject: (id: string, reason: string) =>
    apiRequest<void>(`/admin/kyc/requests/${id}/reject`, { method: 'POST', body: { reason } }),

  submitDocuments: (data: ProviderApplicationData['documents']) =>
    apiRequest<void>('/kyc/submit', { method: 'POST', body: data }),

  getStatus: () =>
    apiRequest<{ status: KycRequest['status']; rejectionReason?: string }>('/kyc/status'),
}

// ─── Bookings API ───────────────────────────────────────
export interface CreateBookingData {
  serviceId: string
  eventType: string
  eventDate: string
  startTime: string
  endTime: string
  guests: number
  location: string
  budget?: number
  description?: string
  categoryData?: Record<string, unknown>
}

export const bookingsApi = {
  getAll: (params?: { page?: number; status?: string }) =>
    apiRequest<PaginatedResponse<Booking>>('/bookings', { params: params as Record<string, string | number | boolean | undefined> }),

  getById: (id: string) =>
    apiRequest<Booking>(`/bookings/${id}`),

  create: (data: CreateBookingData) =>
    apiRequest<Booking>('/bookings', { method: 'POST', body: data }),

  updateStatus: (id: string, status: Booking['status']) =>
    apiRequest<Booking>(`/bookings/${id}/status`, { method: 'PATCH', body: { status } }),

  cancel: (id: string, reason?: string) =>
    apiRequest<void>(`/bookings/${id}/cancel`, { method: 'POST', body: { reason } }),

  getMyBookings: (params?: { page?: number; status?: string }) =>
    apiRequest<PaginatedResponse<Booking>>('/bookings/mine', { params: params as Record<string, string | number | boolean | undefined> }),

  getProviderBookings: (params?: { page?: number; status?: string }) =>
    apiRequest<PaginatedResponse<Booking>>('/bookings/provider', { params: params as Record<string, string | number | boolean | undefined> }),
}

// ─── Payments API ───────────────────────────────────────
export interface ProcessPaymentData {
  bookingId: string
  method: 'mobile_money' | 'card' | 'cash'
  amount: number
  currency: string
  details: {
    provider?: string // e.g., 'mpesa', 'airtel', 'mtn'
    phoneNumber?: string
    cardToken?: string
  }
}

export const paymentsApi = {
  process: (data: ProcessPaymentData) =>
    apiRequest<{ transactionId: string; status: string; redirectUrl?: string }>('/payments/process', { method: 'POST', body: data }),

  verify: (transactionId: string) =>
    apiRequest<{ status: string; booking?: Booking }>(`/payments/verify/${transactionId}`),

  refund: (transactionId: string, reason: string) =>
    apiRequest<void>('/payments/refund', { method: 'POST', body: { transactionId, reason } }),

  getTransactions: (params?: { page?: number; status?: string; type?: string }) =>
    apiRequest<PaginatedResponse<Transaction>>('/payments/transactions', { params: params as Record<string, string | number | boolean | undefined> }),

  requestPayout: (data: { amount: number; method: string; accountDetails: Record<string, string> }) =>
    apiRequest<{ payoutId: string; status: string }>('/payments/payout', { method: 'POST', body: data }),

  getEarnings: (params?: { period?: string }) =>
    apiRequest<{ total: number; pending: number; available: number; transactions: Transaction[] }>('/payments/earnings', { params: params as Record<string, string | number | boolean | undefined> }),
}

// ─── Reviews API ────────────────────────────────────────
export const reviewsApi = {
  getByService: (serviceId: string, params?: { page?: number }) =>
    apiRequest<PaginatedResponse<Review>>(`/services/${serviceId}/reviews`, { params: params as Record<string, string | number | boolean | undefined> }),

  create: (serviceId: string, data: { rating: number; comment: string }) =>
    apiRequest<Review>('/reviews', { method: 'POST', body: { serviceId, ...data } }),

  reply: (reviewId: string, reply: string) =>
    apiRequest<Review>(`/reviews/${reviewId}/reply`, { method: 'POST', body: { reply } }),

  getProviderReviews: (params?: { page?: number }) =>
    apiRequest<PaginatedResponse<Review>>('/reviews/provider', { params: params as Record<string, string | number | boolean | undefined> }),
}

// ─── Categories API ─────────────────────────────────────
export const categoriesApi = {
  getAll: () =>
    apiRequest<Category[]>('/categories'),
}

// ─── Admin API ──────────────────────────────────────────
export interface AdminOverview {
  totalUsers: number
  totalProviders: number
  totalBookings: number
  totalRevenue: number
  pendingKyc: number
  recentTransactions: Transaction[]
  recentBookings: Booking[]
}

export const adminApi = {
  getOverview: () =>
    apiRequest<AdminOverview>('/admin/overview'),

  getEarnings: (params?: { period?: string }) =>
    apiRequest<{ total: number; commission: number; byMonth: { month: string; amount: number }[] }>('/admin/earnings', { params: params as Record<string, string | number | boolean | undefined> }),

  getUsers: (params?: { page?: number; role?: string; search?: string }) =>
    apiRequest<PaginatedResponse<User>>('/admin/users', { params: params as Record<string, string | number | boolean | undefined> }),

  updateCommission: (tier: string, rate: number) =>
    apiRequest<void>('/admin/commissions', { method: 'PUT', body: { tier, rate } }),

  getReports: (params?: { type?: string; period?: string }) =>
    apiRequest<{ data: unknown[]; summary: Record<string, number> }>('/admin/reports', { params: params as Record<string, string | number | boolean | undefined> }),

  getProviderRequests: (params?: { page?: number; status?: string }) =>
    apiRequest<PaginatedResponse<KycRequest>>('/admin/provider-requests', { params: params as Record<string, string | number | boolean | undefined> }),
}

// ─── Subscriptions API ──────────────────────────────────
export const subscriptionsApi = {
  getPlans: () =>
    apiRequest<Subscription[]>('/subscriptions/plans'),

  subscribe: (planId: string) =>
    apiRequest<{ subscriptionId: string; status: string }>('/subscriptions', { method: 'POST', body: { planId } }),

  cancel: () =>
    apiRequest<void>('/subscriptions', { method: 'DELETE' }),

  getCurrent: () =>
    apiRequest<{ subscription: Subscription; expiresAt: string; autoRenew: boolean }>('/subscriptions/current'),
}

// ─── Upload API ─────────────────────────────────────────
export const uploadApi = {
  uploadFile: async (file: File, folder: string = 'general'): Promise<ApiResponse<{ url: string }>> => {
    const token = getAuthToken()
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    const response = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    })

    let data: { url: string }
    try {
      data = await response.json()
    } catch {
      data = { url: '' }
    }

    return { data, status: response.status, ok: response.ok }
  },

  uploadMultiple: async (files: File[], folder: string = 'general'): Promise<ApiResponse<{ urls: string[] }>> => {
    const token = getAuthToken()
    const formData = new FormData()
    files.forEach((file) => formData.append('files', file))
    formData.append('folder', folder)

    const response = await fetch(`${BASE_URL}/upload/multiple`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    })

    let data: { urls: string[] }
    try {
      data = await response.json()
    } catch {
      data = { urls: [] }
    }

    return { data, status: response.status, ok: response.ok }
  },

  deleteFile: (url: string) =>
    apiRequest<void>('/upload', { method: 'DELETE', body: { url } }),
}

// ─── AI API (for event preview generation) ──────────────
export const aiApi = {
  generateEventPreview: (params: {
    eventType: string
    style: string
    colorPalette: string
    description?: string
  }) =>
    apiRequest<{ imageUrl: string }>('/ai/generate-preview', { method: 'POST', body: params }),

  getRecommendations: (params: {
    eventType: string
    budget: number
    location: string
    guests: number
  }) =>
    apiRequest<Service[]>('/ai/recommendations', { method: 'POST', body: params }),
}

// Export types for use in components
export type { ApiError }
