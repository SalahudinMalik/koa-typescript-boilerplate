import { IsNumber, IsOptional, IsString, Length, Min } from "class-validator";
import { Type } from "class-transformer";

export class PaginationSchema {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
    page = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
    perPage = 20;

  @IsOptional()
  @IsString()
    query = "";

  @IsOptional()
  @IsString()
  @Length(2)
    sort = "firstName";

  @IsOptional()
  @IsString()
  @Length(1)
    sortDir = "ASC";

  @IsOptional()
  @IsNumber({}, { each: true })
  @Type(() => Number)
    filters: number[] = [];
}
