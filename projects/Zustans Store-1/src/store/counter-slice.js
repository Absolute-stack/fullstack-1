export const createCounterSlice = (set) => ({
  count: 0,
  inc: () =>
    set((state) => {
      state.count = state.count + 1;
    }),
  dec: () =>
    set((state) => {
      state.count = state.count - 1;
    }),
});
