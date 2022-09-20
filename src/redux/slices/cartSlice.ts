import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from '../store'

export type CartItem = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  type: string;
  count: number;
}

interface CartSliceState {
  totalPrice: number,
  items: CartItem[]
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
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
      state.totalPrice = state.items.reduce((sum, obj) => sum + (obj.price * obj.count), 0)
    },
    removeItem(state, action: PayloadAction<string>) { 
      state.items = state.items.filter(obj => obj.id !== action.payload) 
      state.totalPrice = state.items.reduce((sum, obj) => sum + (obj.price * obj.count), 0)
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
      state.totalPrice = state.items.reduce((sum, obj) => sum + (obj.price * obj.count), 0)
    },
    decreaseItemsAmount(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload)
      if (findItem && findItem.count > 0 ) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => sum + (obj.price * obj.count), 0)
    },
  }
})

export const selectCart = (cart: RootState['cart']) => cart
// export const selectAddedCartCountById = (id: string) => (cart: RootState['cart']) => cart.items.find((obj) => obj.id === id)


export const {addItem, removeItem, clearItems, increaseItemsAmount, decreaseItemsAmount} = cartSlice.actions;

export default cartSlice.reducer;

