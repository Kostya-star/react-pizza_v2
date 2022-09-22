import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from '../../store'
import { getCartItemsFromLS } from './../../../utils/getCartItemsFromLS';
import { CartItem, CartSliceState } from './types';
import { getTotalPrice } from './../../../utils/getTotalPrice';



const {items, totalPrice} = getCartItemsFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItem(state, action) { 
    //   state.items.push(action.payload)
    //   state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price, 0)
    // },
    addItem(state, action: PayloadAction<CartItem>) { 
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count:  1,
        });
      }
      state.totalPrice = getTotalPrice(state.items)
    },
    removeItem(state, action: PayloadAction<string>) { 
      state.items = state.items.filter(obj => obj.id !== action.payload) 
      state.totalPrice = getTotalPrice(state.items)
    },
    clearItems(state) { 
      state.items = [] 
      state.totalPrice = 0;
    },
    increaseItemsAmount(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload)
      if (findItem) {
        findItem.count++;
      }
      state.totalPrice = getTotalPrice(state.items)
    },
    decreaseItemsAmount(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload)
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = getTotalPrice(state.items)
    },
  }
})



export const {addItem, removeItem, clearItems, increaseItemsAmount, decreaseItemsAmount} = cartSlice.actions;

export default cartSlice.reducer;

