import { CartItem } from '../redux/slices/cart/types';
import { getTotalPrice } from './getTotalPrice';


export const getCartItemsFromLS = () => {
  const data = localStorage.getItem('cart'); 
  const items = data ? JSON.parse(data) : [];
  const totalPrice = getTotalPrice(items)

    return {
      items: items as CartItem[],
      totalPrice,
    }
}
