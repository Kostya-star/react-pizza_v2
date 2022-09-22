export type CartItem = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  type: string;
  count: number;
}

export interface CartSliceState {
  totalPrice: number,
  items: CartItem[],
}