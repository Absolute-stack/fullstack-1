export async function fetchProducts(filters = {}, pageParam = null) {
  try {
    const params = new URLSearchParams();
    if (pageParam) params.set('cursor', pageParam);
    params.set('limit', '25');

    if (filters.category) params.set('category', filters.category);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.search) params.set('search', filters.search);

    const res = await fetch(`http://localhost:5000/api/products?${params}`);
    if (!res.ok) throw new Error('Something went wrong fetching products');
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export async function fetchFilters() {
  try {
    const res = await fetch(`http://localhost:5000/api/products/filters`);
    if (!res.ok)
      throw new Error('Something went wrong fetching product filters.');
    return res.json();
  } catch (error) {
    console.error(error);
  }
}
