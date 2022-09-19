import { PaginationDto } from './pagination.dto';

export interface PricePaginationDto extends PaginationDto {
  from: string;
  to: string;
}
