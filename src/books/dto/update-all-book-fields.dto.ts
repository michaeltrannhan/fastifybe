import { PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsDate,
  IsOptional,
} from 'class-validator';

export class UpdateAllBookFieldsDto extends PartialType(CreateBookDto) {
  @IsNotEmpty()
  id: number;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  publishedDate: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;
}
