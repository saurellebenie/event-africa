'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { ApiResponse, ApiError, PaginatedResponse } from '@/lib/api'

/**
 * Generic hook for API calls with loading and error states
 */
export function useApiCall<T>() {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const execute = useCallback(async (apiCall: () => Promise<ApiResponse<T>>) => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiCall()
      setData(response.data)
      return response.data
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)
      throw apiError
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return { data, loading, error, execute, reset, setData }
}

/**
 * Hook for fetching data on mount with optional dependencies
 */
export function useFetch<T>(
  fetcher: () => Promise<ApiResponse<T>>,
  deps: unknown[] = [],
  options?: { enabled?: boolean }
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ApiError | null>(null)
  const mountedRef = useRef(true)

  const refetch = useCallback(async () => {
    if (!options?.enabled && options?.enabled !== undefined) return
    setLoading(true)
    setError(null)
    try {
      const response = await fetcher()
      if (mountedRef.current) {
        setData(response.data)
      }
      return response.data
    } catch (err) {
      if (mountedRef.current) {
        setError(err as ApiError)
      }
      throw err
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, [fetcher, options?.enabled])

  useEffect(() => {
    mountedRef.current = true
    if (options?.enabled !== false) {
      refetch()
    }
    return () => {
      mountedRef.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, options?.enabled])

  return { data, loading, error, refetch, setData }
}

/**
 * Hook for paginated data fetching
 */
export function usePagination<T>(
  fetcher: (page: number, perPage: number) => Promise<ApiResponse<PaginatedResponse<T>>>,
  initialPerPage = 10
) {
  const [data, setData] = useState<T[]>([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(initialPerPage)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ApiError | null>(null)

  const fetchPage = useCallback(async (pageNum: number) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetcher(pageNum, perPage)
      setData(response.data.data)
      setTotal(response.data.total)
      setTotalPages(response.data.totalPages)
      setPage(pageNum)
    } catch (err) {
      setError(err as ApiError)
    } finally {
      setLoading(false)
    }
  }, [fetcher, perPage])

  useEffect(() => {
    fetchPage(1)
  }, [fetchPage])

  const goToPage = useCallback((pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      fetchPage(pageNum)
    }
  }, [fetchPage, totalPages])

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      fetchPage(page + 1)
    }
  }, [fetchPage, page, totalPages])

  const prevPage = useCallback(() => {
    if (page > 1) {
      fetchPage(page - 1)
    }
  }, [fetchPage, page])

  const refresh = useCallback(() => {
    fetchPage(page)
  }, [fetchPage, page])

  return {
    data,
    page,
    perPage,
    total,
    totalPages,
    loading,
    error,
    goToPage,
    nextPage,
    prevPage,
    refresh,
    setPerPage,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  }
}

/**
 * Hook for mutation operations (create, update, delete)
 */
export function useMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>,
  options?: {
    onSuccess?: (data: TData) => void
    onError?: (error: ApiError) => void
  }
) {
  const [data, setData] = useState<TData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const mutate = useCallback(async (variables: TVariables) => {
    setLoading(true)
    setError(null)
    try {
      const response = await mutationFn(variables)
      setData(response.data)
      options?.onSuccess?.(response.data)
      return response.data
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)
      options?.onError?.(apiError)
      throw apiError
    } finally {
      setLoading(false)
    }
  }, [mutationFn, options])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return { data, loading, error, mutate, reset }
}

/**
 * Hook for infinite scrolling / load more
 */
export function useInfiniteScroll<T>(
  fetcher: (page: number) => Promise<ApiResponse<PaginatedResponse<T>>>
) {
  const [data, setData] = useState<T[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState<ApiError | null>(null)

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)
    setError(null)
    try {
      const response = await fetcher(page)
      setData(prev => [...prev, ...response.data.data])
      setHasMore(page < response.data.totalPages)
      setPage(prev => prev + 1)
    } catch (err) {
      setError(err as ApiError)
    } finally {
      setLoading(false)
      setInitialLoading(false)
    }
  }, [fetcher, page, loading, hasMore])

  useEffect(() => {
    loadMore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const refresh = useCallback(() => {
    setData([])
    setPage(1)
    setHasMore(true)
    setInitialLoading(true)
  }, [])

  return { data, loading, initialLoading, error, hasMore, loadMore, refresh }
}

/**
 * Hook for debounced search
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
