import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
export const ShopContext = createContext();

function ShopContextProvider(props) {
  const currency = 'GH₵';
  const backend = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState([]);
  const [showSearchbar, setShowSearchbar] = useState(false);
  const value = {
    currency,
    backend,
    products,
    setProducts,
    showSearchbar,
    setShowSearchbar,
  };

  async function fetchProducts() {
    try {
      const res = await axios.get(backend + '/api/product/list', {
        withCredentials: true,
      });
      return setProducts(res.data?.allProducts);
    } catch (error) {
      console.log(error);
      return toast.error('Something Went Wrong Please Refresh the page.');
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
}

export default ShopContextProvider;
