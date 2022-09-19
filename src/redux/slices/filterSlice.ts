import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from '../store';


type Sort = {
  name: string; 
  sortProperty: 'rating'| 'price' | 'title' | '-rating'| '-price' | '-title';
}

interface FilterSliceState {
  sort: Sort;
  activeSortItem: Sort;
  currentPage: number;
  activeCategory: number;
  searchValue: string;
}

const initialState: FilterSliceState = {
  sort: {
    name: 'популярности', 
    sortProperty: 'rating',
  },
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
    setActiveCategory(state, action: PayloadAction<number>) { 
      state.activeCategory = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setActiveSortItem(state, action: PayloadAction<Sort>) {
      state.activeSortItem = action.payload
    }, 
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.sort = action.payload.sort;
        state.currentPage = Number(action.payload.currentPage);
        state.activeCategory = Number(action.payload.activeCategory);
      } else {
        state.currentPage = 1;
        state.activeCategory = 0;
        state.sort = {
          name: 'популярности',
          sortProperty: 'rating',
        }
      }
    },
  }
})

export const selectFilter = (filter: RootState["filter"]) => filter;

export const {setActiveCategory, setActiveSortItem, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;

