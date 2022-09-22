export type PizzaItem = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  types: number[];
  count: number;
}

export interface PizzaSliceState {
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

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}