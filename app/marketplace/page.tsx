'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ArrowLeft, Search, Star, MapPin, SlidersHorizontal,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2,
} from 'lucide-react'
import Navigation from '@/components/navigation'
import { useI18n } from '@/lib/i18n'
import { servicesApi, categoriesApi, type Service, type Category, type ServiceFilters } from '@/lib/api'
import { useDebounce } from '@/lib/hooks/use-api'

/* ── static data (fallback when API not available) ────── */
const ITEMS_PER_PAGE = 9

const categoryKeys = [
  { id: 'all', key: 'cat.all' as const },
  { id: 'venue', key: 'cat.venue' as const },
  { id: 'dj', key: 'cat.dj' as const },
  { id: 'catering', key: 'cat.catering' as const },
  { id: 'decoration', key: 'cat.decoration' as const },
  { id: 'photography', key: 'cat.photography' as const },
  { id: 'planning', key: 'cat.planning' as const },
]

// Fallback mock data when API is not available
const mockServices: Service[] = [
  { id: '1', providerId: 'p1', providerName: 'Crystal Venue Nairobi', title: 'Crystal Venue Nairobi', category: 'venue', description: 'Stunning luxury venue', descriptionFr: 'Salle de reception luxueuse pour mariages et evenements haut de gamme.', descriptionEn: 'Luxury reception hall for weddings and high-end events.', location: 'Nairobi, Kenya', price: 250000, priceUnit: 'per event', currency: 'KES', images: ['/luxury-event-venue.png'], rating: 4.9, reviewCount: 128, status: 'active', createdAt: '', updatedAt: '' },
  { id: '2', providerId: 'p2', providerName: 'DJ Sound Masters', title: 'DJ Sound Masters', category: 'dj', description: 'Professional DJ', descriptionFr: 'DJ professionnel avec son et lumieres pour animer vos evenements.', descriptionEn: 'Professional DJ with sound and lights for your events.', location: 'Lagos, Nigeria', price: 50000, priceUnit: 'per event', currency: 'NGN', images: ['/professional-dj-equipment.jpg'], rating: 4.8, reviewCount: 95, status: 'active', createdAt: '', updatedAt: '' },
  { id: '3', providerId: 'p3', providerName: 'Elegant Catering Co', title: 'Elegant Catering Co', category: 'catering', description: 'Gourmet catering', descriptionFr: 'Service traiteur gastronomique africain et international.', descriptionEn: 'African and international gourmet catering service.', location: 'Cape Town, South Africa', price: 100000, priceUnit: 'per event', currency: 'ZAR', images: ['/gourmet-catering-spread.jpg'], rating: 4.7, reviewCount: 156, status: 'active', createdAt: '', updatedAt: '' },
  { id: '4', providerId: 'p4', providerName: 'Floral Dream Design', title: 'Floral Dream Design', category: 'decoration', description: 'Floral decoration', descriptionFr: 'Decoration florale et mise en scene elegante pour vos evenements.', descriptionEn: 'Floral decoration and elegant staging for your events.', location: 'Accra, Ghana', price: 75000, priceUnit: 'per event', currency: 'GHS', images: ['/wedding-flower-decorations.jpg'], rating: 4.9, reviewCount: 203, status: 'active', createdAt: '', updatedAt: '' },
  { id: '5', providerId: 'p5', providerName: 'Professional Lens Studio', title: 'Professional Lens Studio', category: 'photography', description: 'Photography', descriptionFr: 'Photographe professionnel capturant vos plus beaux moments.', descriptionEn: 'Professional photographer capturing your finest moments.', location: 'Johannesburg, South Africa', price: 120000, priceUnit: 'per event', currency: 'ZAR', images: ['/professional-photo-session.png'], rating: 4.8, reviewCount: 112, status: 'active', createdAt: '', updatedAt: '' },
  { id: '6', providerId: 'p6', providerName: 'Event Maestro Planning', title: 'Event Maestro Planning', category: 'planning', description: 'Event planning', descriptionFr: 'Organisation et coordination complete de vos evenements.', descriptionEn: 'Complete event organization and coordination.', location: 'Kampala, Uganda', price: 200000, priceUnit: 'per event', currency: 'UGX', images: ['/event-planning-coordination.jpg'], rating: 4.9, reviewCount: 89, status: 'active', createdAt: '', updatedAt: '' },
  { id: '7', providerId: 'p7', providerName: 'Golden Touch Decor', title: 'Golden Touch Decor', category: 'decoration', description: 'Golden decoration', descriptionFr: 'Decoration doree et themes personnalises pour tout evenement.', descriptionEn: 'Golden decoration and custom themes for all events.', location: 'Dakar, Senegal', price: 500000, priceUnit: 'per event', currency: 'XOF', images: ['/golden-wedding-decoration-1.jpg'], rating: 4.6, reviewCount: 178, status: 'active', createdAt: '', updatedAt: '' },
  { id: '8', providerId: 'p8', providerName: 'Beats Factory DJ', title: 'Beats Factory DJ', category: 'dj', description: 'Afrobeats mix', descriptionFr: 'Mix afrobeats, coupe-decale et hits internationaux.', descriptionEn: 'Afrobeats, coupe-decale and international hits mix.', location: 'Abidjan, Ivory Coast', price: 350000, priceUnit: 'per event', currency: 'XOF', images: ['/dj-mixing-console-wedding.jpg'], rating: 4.7, reviewCount: 64, status: 'active', createdAt: '', updatedAt: '' },
  { id: '9', providerId: 'p9', providerName: 'Royal Banquet Hall', title: 'Royal Banquet Hall', category: 'venue', description: 'Royal hall', descriptionFr: 'Salle royale avec capacite de 500 places assises.', descriptionEn: 'Royal hall with a capacity of 500 seats.', location: 'Douala, Cameroon', price: 800000, priceUnit: 'per event', currency: 'XAF', images: ['/elegant-event-hall.png'], rating: 4.8, reviewCount: 210, status: 'active', createdAt: '', updatedAt: '' },
]

/* ── component ───────────────────────────────────────── */
export default function Marketplace() {
  const { t, locale } = useI18n()

  // State
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name'>('rating')
  const [showSortMenu, setShowSortMenu] = useState(false)

  // API state
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  // Debounce search query
  const debouncedSearch = useDebounce(searchQuery, 300)

  // Fetch services from API
  const fetchServices = useCallback(async () => {
    setLoading(true)
    setError(null)

    const filters: ServiceFilters = {
      page: currentPage,
      perPage: ITEMS_PER_PAGE,
      search: debouncedSearch || undefined,
      category: selectedCategory !== 'all' ? selectedCategory : undefined,
      sort: sortBy,
    }

    try {
      const response = await servicesApi.getAll(filters)
      if (response.ok) {
        setServices(response.data.data)
        setTotal(response.data.total)
        setTotalPages(response.data.totalPages)
      } else {
        throw new Error('Failed to fetch services')
      }
    } catch (err) {
      console.log('[v0] API unavailable, using mock data:', err)
      // Fallback to mock data
      const filtered = mockServices.filter(s => {
        const matchesSearch = !debouncedSearch ||
          s.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          s.location.toLowerCase().includes(debouncedSearch.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory
        return matchesSearch && matchesCategory
      })

      filtered.sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating
        if (sortBy === 'reviews') return b.reviewCount - a.reviewCount
        return a.title.localeCompare(b.title)
      })

      const start = (currentPage - 1) * ITEMS_PER_PAGE
      const end = start + ITEMS_PER_PAGE
      setServices(filtered.slice(start, end))
      setTotal(filtered.length)
      setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE))
    } finally {
      setLoading(false)
    }
  }, [currentPage, debouncedSearch, selectedCategory, sortBy])

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoriesApi.getAll()
      if (response.ok) {
        setCategories(response.data)
      }
    } catch {
      // Use default categories on error
    }
  }, [])

  // Initial fetch
  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  // Fetch services when filters change
  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  // Handlers
  const handleCategoryChange = useCallback((cat: string) => {
    setSelectedCategory(cat)
    setCurrentPage(1)
  }, [])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }, [])

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('ellipsis')
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i)
      if (currentPage < totalPages - 2) pages.push('ellipsis')
      pages.push(totalPages)
    }
    return pages
  }

  const getCategoryLabel = (catId: string) => {
    // Try to get from API categories first
    const apiCat = categories.find(c => c.slug === catId)
    if (apiCat) return locale === 'fr' ? apiCat.nameFr : apiCat.nameEn

    // Fallback to static keys
    const found = categoryKeys.find((c) => c.id === catId)
    return found ? t(found.key) : catId
  }

  const formatPrice = (service: Service) => {
    return new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: service.currency || 'XOF',
      maximumFractionDigits: 0,
    }).format(service.price)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={false} userType="customer" />

      {/* ── Fixed sub-header ───────────────────────────── */}
      <div className="fixed top-16 left-0 right-0 z-40 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Row 1: back + title */}
          <div className="flex items-center gap-4 mb-3">
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2 border-border hover:bg-muted">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{t('marketplace.backHome')}</span>
              </Button>
            </Link>
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-foreground">{t('marketplace.title')}</h1>
              <p className="text-sm text-muted-foreground hidden sm:block">
                {total} {t('marketplace.providersAvailable')}
              </p>
            </div>
          </div>

          {/* Row 2: search + sort */}
          <div className="flex items-center gap-3 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('marketplace.search')}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-border"
                onClick={() => setShowSortMenu(!showSortMenu)}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">{t('marketplace.sort')}</span>
              </Button>
              {showSortMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-1 z-50">
                  {([
                    { value: 'rating' as const, labelKey: 'marketplace.sortRating' as const },
                    { value: 'reviews' as const, labelKey: 'marketplace.sortPopular' as const },
                    { value: 'name' as const, labelKey: 'marketplace.sortName' as const },
                  ]).map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setShowSortMenu(false) }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${sortBy === opt.value ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-muted'
                        }`}
                    >
                      {t(opt.labelKey)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Row 3: category chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mb-1">
            {categoryKeys.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground hover:border-primary/50'
                  }`}
              >
                {t(cat.key)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scrollable content ─────────────────────────── */}
      <main className="pt-[272px] sm:pt-[256px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">{t('marketplace.loading') || 'Loading...'}</span>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={fetchServices}>{t('marketplace.retry') || 'Retry'}</Button>
            </div>
          )}

          {/* Services grid */}
          {!loading && !error && services.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link key={service.id} href={`/marketplace/provider/${service.id}`}>
                  <Card className="overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer h-full flex flex-col group">
                    <div className="aspect-video bg-muted overflow-hidden relative">
                      <img
                        src={service.images?.[0] || '/placeholder.svg'}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-background/90 text-foreground">
                          {getCategoryLabel(service.category)}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{service.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {locale === 'fr' ? (service.descriptionFr || service.description) : (service.descriptionEn || service.description)}
                      </p>
                      <div className="flex items-center gap-2 mb-2 text-sm">
                        <Star size={14} className="fill-accent text-accent" />
                        <span className="font-medium text-foreground">{service.rating}</span>
                        <span className="text-muted-foreground">({service.reviewCount} {t('marketplace.reviews')})</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                        <MapPin size={14} />
                        {service.location}
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <p className="font-semibold text-primary">{formatPrice(service)}</p>
                        <span className="text-xs font-medium text-primary hover:underline">
                          {t('marketplace.viewDetails')} &rarr;
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && services.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Search className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{t('marketplace.noResults')}</h3>
              <p className="text-muted-foreground text-sm mb-4">{t('marketplace.noResultsHint')}</p>
              <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('all') }}>
                {t('marketplace.resetFilters')}
              </Button>
            </div>
          )}

          {/* ── Pagination ───────────────────────────── */}
          {!loading && totalPages > 1 && (
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                {t('marketplace.showing')}{' '}
                <span className="font-medium text-foreground">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span>
                {' '}{t('marketplace.to')}{' '}
                <span className="font-medium text-foreground">{Math.min(currentPage * ITEMS_PER_PAGE, total)}</span>
                {' '}{t('marketplace.of')}{' '}
                <span className="font-medium text-foreground">{total}</span>
                {' '}{t('marketplace.results')}
              </p>

              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-9 w-9 border-border" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
                  <ChevronsLeft className="w-4 h-4" />
                  <span className="sr-only">{t('pagination.first')}</span>
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9 border-border" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
                  <ChevronLeft className="w-4 h-4" />
                  <span className="sr-only">{t('pagination.previous')}</span>
                </Button>

                {getPageNumbers().map((page, idx) =>
                  page === 'ellipsis' ? (
                    <span key={`e-${idx}`} className="px-2 text-muted-foreground text-sm select-none">...</span>
                  ) : (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="icon"
                      className={`h-9 w-9 ${currentPage === page ? '' : 'border-border'}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  )
                )}

                <Button variant="outline" size="icon" className="h-9 w-9 border-border" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}>
                  <ChevronRight className="w-4 h-4" />
                  <span className="sr-only">{t('pagination.next')}</span>
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9 border-border" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>
                  <ChevronsRight className="w-4 h-4" />
                  <span className="sr-only">{t('pagination.last')}</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
