export const createCartSlice = (set, get) => ({
  products: [],
  addProduct: (product) =>
    set((state) => {
      const pItem = state.products.find((p) => p._id === product._id);
      if (pItem) {
        pItem.quantity += 1;
      } else {
        state.products.push({ ...product, quantity: 1 });
      }
    }),

  inc: (id) =>
    set((state) => {
      const product = state.products.find((p) => p._id === id);
      if (product) {
        product.quantity += 1;
      }
    }),
  dec: (id) =>
    set((state) => {
      const product = state.products.find((p) => p._id === id);
      if (product) {
        product.quantity -= 1;
        if (product.quantity <= 0) {
          state.products = state.products.filter((p) => p._id !== id);
        }
      }
    }),
  removeProduct: (id) =>
    set((state) => {
      state.products = state.products.filter((p) => p._id !== id);
    }),
  clearCart: () =>
    set((state) => {
      state.products = [];
    }),
  getTotalQty: () => {
    const products = get().products;
    return products.reduce((total, item) => total + item.quantity, 0);
  },
  getTotalPrice: () => {
    const products = get().products;
    return products.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );
  },
});
