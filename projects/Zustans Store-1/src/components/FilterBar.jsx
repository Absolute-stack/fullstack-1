import { useProductFilters } from '../Queries/useQueries.jsx';

export default function Filterbar({ filters, onChange }) {
  const { data, isLoading, isError, error } = useProductFilters();

  function handleCategory(e) {
    onChange({
      ...filters,
      category: e.target.value || undefined,
    });
  }

  function handleMinPrice(e) {
    onChange({
      ...filters,
      minPrice: e.target.value || undefined,
    });
  }

  function handleMaxPrice(e) {
    onChange({
      ...filters,
      maxPrice: e.target.value || undefined,
    });
  }

  function handleSearch(e) {
    onChange({
      ...filters,
      search: e.target.value || undefined,
    });
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div className="filter-bar">
      {/* Searchbar */}
      <input
        type="text"
        value={filters.search || ''}
        onChange={handleSearch}
        placeholder="Search products..."
      />

      <select value={filters.category} onChange={handleCategory}>
        <option value="">All categories</option>
        {data.categories.map((cat, i) => {
          return (
            <option value={cat} key={i}>
              {cat}
            </option>
          );
        })}
      </select>
    </div>
  );
}
