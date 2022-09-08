import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import pagination from './slices/paginationSlice'


export const store = configureStore({
  reducer: {
    filter,
    pagination,
  },
})

window.store = store;
