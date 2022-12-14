import { PaginationDto } from './pagination.dto';

export interface TwapPaginationDto extends PaginationDto {
  interval: number;
  from: string;
  to: string;
}
