import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from '../store';


export enum SortPropertyEnum {
  RATING_ASC = 'rating',
  PRICE_ASC = 'price',
  TITLE_ASC = 'title',
  RATING_DESC = '-rating',
  PRICE_DESC = '-price',
  TITLE_DESC = '-title',
}

export type Sort = {
  name: string; 
  sortProperty: SortPropertyEnum;
}

export interface FilterSliceState {
  sort: Sort;
  currentPage: number;
  activeCategory: number;
  searchValue: string;
}

const initialState: FilterSliceState = {
  sort: {
    name: 'популярности', 
    sortProperty: SortPropertyEnum.RATING_ASC,
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
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload
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
          sortProperty: SortPropertyEnum.RATING_DESC,
        }
      }
    },
  }
})

export const selectFilter = ({filter}: RootState) => filter;

export const {setActiveCategory, setSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;

