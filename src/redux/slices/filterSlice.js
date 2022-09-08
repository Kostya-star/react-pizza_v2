import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 0,
  activeSortItem: {
    name: 'популярности', 
    sortProperty: 'rating'
  },
  currentPage: 1,
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveCategory(state, action) { 
      state.activeCategory = action.payload
    },
    setActiveSortItem(state, action) {
      state.activeSortItem = action.payload
    }, 
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
  }
})


export const {setActiveCategory, setActiveSortItem, setCurrentPage} = filterSlice.actions;

export default filterSlice.reducer;

