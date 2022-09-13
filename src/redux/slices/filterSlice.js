import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeSortItem: {
    name: 'популярности', 
    sortProperty: 'rating',
  },
  currentPage: 1,
  activeCategory: 0,
  searchValue: '',
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveCategory(state, action) { 
      state.activeCategory = action.payload
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },
    setActiveSortItem(state, action) {
      state.activeSortItem = action.payload
    }, 
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      state.activeSortItem = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.activeCategory = Number(action.payload.activeCategory);
    },
  }
})

export const selectFilter = ({filter}) => filter;

export const {setActiveCategory, setActiveSortItem, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;

