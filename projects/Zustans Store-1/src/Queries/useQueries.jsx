import { fetchProducts, fetchFilters } from '../api/productAPI.js';
import {
  useInfiniteQuery,
  useQuery,
  keepPreviousData,
} from '@tanstack/react-query';

export function useProducts(filters = {}) {
  return useInfiniteQuery({
    queryKey: ['products', filters],
    queryFn: ({ pageParam }) => fetchProducts(filters, pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    placeholderData: keepPreviousData,
  });
}

export function useProductFilters() {
  return useQuery({
    queryKey: ['product-filters'],
    queryFn: fetchFilters,
    staleTime: 60 * 60 * 1000,
  });
}
