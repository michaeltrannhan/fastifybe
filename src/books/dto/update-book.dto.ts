import { PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsDate,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsDate()
  @IsOptional()
  publishedDate?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;
}
