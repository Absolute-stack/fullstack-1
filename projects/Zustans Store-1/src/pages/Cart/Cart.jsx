import { useState } from 'react';
import { useProducts } from '../../Queries/useQueries.jsx';
import Filterbar from '../../components/FilterBar.jsx';

export default function Cart() {
  const [filters, setFilters] = useState({});
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts(filters);

  if (isLoading) return <div>Loading....</div>;
  if (isError) return <pre>Error: {error.message}</pre>;

  const allProducts = data.pages.flatMap((page) => page.products);

  return (
    <div className="cart">
      <h1>This is CartPage</h1>
      <Filterbar filters={filters} onChange={setFilters} />
      {allProducts.map((product) => {
        return (
          <div className="card">
            <div className="card-title">{product.name}</div>
            <img
              src={product.image}
              alt={product.name}
              loading="eager"
              decoding="async"
            />
            <div className="card-price">{product.price}</div>
          </div>
        );
      })}
      {hasNextPage && (
        <button onClick={fetchNextPage} type="button">
          {isFetchingNextPage ? 'Loading' : 'Load More'}
        </button>
      )}
    </div>
  );
}
