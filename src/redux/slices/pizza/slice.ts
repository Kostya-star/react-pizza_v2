import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PizzaItem, PizzaSliceState, PizzasParams, Status } from './types';





export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: PizzasParams) => {
    const { category, sortBy, order, search, currentPage } = params;
    const response = await axios.get(`https://631232c7f5cba498da8ea065.mockapi.io/pizzaItems?${category}&page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}&${search}`)
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

