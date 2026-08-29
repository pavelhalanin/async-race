export interface PaginationDto {
  count: number;
  page: number;
  limit: number;
}

export interface PaginationAllDto {
  count: number;
  limit: number;
  currentPage: number;
  lastPage: number;
}
