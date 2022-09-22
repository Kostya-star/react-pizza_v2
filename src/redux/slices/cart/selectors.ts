import { RootState } from "../../store";


export const selectCart = (state: RootState) => state.cart;
export const selectAddedCartCountById = (id: string) => ({cart}: RootState) => cart.items.find((obj) => obj.id === id)
