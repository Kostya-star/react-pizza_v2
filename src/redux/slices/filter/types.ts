export enum SortPropertyEnum {
  RATING_ASC = 'rating',
  PRICE_ASC = 'price',
  TITLE_ASC = 'title',
  RATING_DESC = '-rating',
  PRICE_DESC = '-price',
  TITLE_DESC = '-title',
}

export type Sort = {
  name: string; 
  sortProperty: SortPropertyEnum;
}

export interface FilterSliceState {
  sort: Sort;
  currentPage: number;
  activeCategory: number;
  searchValue: string;
}