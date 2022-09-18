export interface PaginationDto {
  page: number;
  size: number;
  sortBy: string;
  sortDirection: 'ASC' | 'DESC';
}
