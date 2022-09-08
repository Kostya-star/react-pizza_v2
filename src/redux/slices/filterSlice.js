import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 0,
  activeSortItem: {
    name: 'популярности', 
    sortProperty: 'rating'
  }
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
    }
  }
})


export const {setActiveCategory, setActiveSortItem} = filterSlice.actions

export default filterSlice.reducer;

