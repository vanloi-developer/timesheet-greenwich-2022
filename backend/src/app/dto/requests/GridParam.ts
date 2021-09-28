export interface ExpressionFilter {
  propertyName: string;
  value: {};
  comparison: number;
}

export interface GridParam {
  sort?: string;
  sortDirection?: number;
  filterItems: [ExpressionFilter];
  searchText: string;
  skipCount: number;
  maxResultCount: number;
}
