import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum SortEnum {
  ASCENDING = 'ASCENDING',
  DESCENDING = 'DESCENDING',
}

export class PageOptionsDto {
  @Type(() => Number)
  @ApiProperty({
    type: Number,
    description: 'Take element in page',
    default: 5,
    required: false,
  })
  take: number;

  @Type(() => Number)
  @ApiProperty({
    type: Number,
    description: 'Page Number',
    default: 1,
    required: false,
  })
  page: number;

  @ApiProperty({
    enum: SortEnum,
    description: 'Sort Ascending or Descending by ',
    required: false,
    default: SortEnum.ASCENDING,
  })
  sort: SortEnum = SortEnum.ASCENDING;

  @ApiProperty({ type: String, description: 'cursor id ', required: false })
  cursor: string;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}
