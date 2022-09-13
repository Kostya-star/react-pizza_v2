import * as axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params, thunkApi) => {
    const { category, sortBy, order, search, currentPage } = params;
    const response = await axios.get(`https://631232c7f5cba498da8ea065.mockapi.io/pizzaItems?${category}&page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}&${search}`)
    return response.data
  }
)

const initialState = {
  items: [],
  status: '', // loading | success | error
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas(state, action) { 
      state.items = action.payload
    },
  },
  extraReducers: {
    [fetchPizzas.pending] : (state) => {
      state.status = 'loading'
      state.items = []
    },
    [fetchPizzas.fulfilled] : (state, action) => {
      state.status = 'success'
      state.items = action.payload
    },
    [fetchPizzas.rejected] : (state) => {
      state.status = 'error'
      state.items = []
    },
  },
})


export const {setPizzas} = pizzaSlice.actions;

export default pizzaSlice.reducer;

