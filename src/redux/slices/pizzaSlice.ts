import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Sort } from './filterSlice';


type PizzaItem = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  types: number[];
  count: number;
}

interface PizzaSliceState {
  status: Status;
  items: PizzaItem[]
}

export type PizzasParams = {
  category: string;
  sortBy: string;
  order: string;
  search: string;
  currentPage: string;
}

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}


export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: PizzasParams) => {
    const { category, sortBy, order, search, currentPage } = params;
    const response = await axios.get<PizzaItem[]>(`https://631232c7f5cba498da8ea065.mockapi.io/pizzaItems?${category}&page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}&${search}`)
    const data = response.data;
    return data as PizzaItem[];
  }
)

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas(state, action) { 
      state.items = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    })
  },

})


export const {setPizzas} = pizzaSlice.actions;

export default pizzaSlice.reducer;

