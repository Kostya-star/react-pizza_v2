import { CartItem } from "../redux/slices/cart/types"


export const getTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}