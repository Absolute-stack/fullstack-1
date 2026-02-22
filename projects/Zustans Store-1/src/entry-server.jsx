import App from './App.jsx';
import { StrictMode } from 'react';
import { fetchFilters } from './api/productAPI.js';
import { fetchProducts } from './api/productAPI.js';
import { makeQueryClient } from './lib/QueryClient.js';
import { StaticRouter } from 'react-router-dom/server';
import { QueryClientProvider, dehydrate } from '@tanstack/react-query';

export async function render(url) {
  const queryClient = makeQueryClient();

  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ['products', {}],
      queryFn: ({ pageParam }) => fetchProducts({}, pageParam),
      initialPageParam: null,
    }),

    queryClient.prefetchQuery({
      queryKey: ['product-filters'],
      queryFn: fetchFilters,
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  const tree = (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </QueryClientProvider>
    </StrictMode>
  );

  return { tree, dehydratedState };
}
