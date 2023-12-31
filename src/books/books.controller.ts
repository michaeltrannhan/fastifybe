import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  Res,
  Version,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

import { FastifyReply, FastifyRequest } from 'fastify';
import { UpdateAllBookFieldsDto } from './dto/update-all-book-fields.dto';
import { ApiResponse } from '@nestjs/swagger';
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @Version('1')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Book already exists',
  })
  async createBook(
    @Body() newBook: CreateBookDto,
    @Res({ passthrough: true })
    res: FastifyReply,
  ) {
    const book = this.booksService.createBook(newBook);
    return book;
  }

  @Post('bulk')
  @Version('1')
  async bulkInsert(
    @Body() books: CreateBookDto[],
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const book = await this.booksService.bulkInsert(books);
    return book;
  }

  @Get()
  @Version('1')
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Put(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() fields: UpdateAllBookFieldsDto) {
    return this.booksService.update(+id, fields);
  }

  @Patch('partials/:id')
  @Version('1')
  updateFields(@Param('id') id: string, @Body() fields: UpdateBookDto) {
    return this.booksService.updateFields(+id, fields);
  }

  @Delete(':id')
  @Version('1')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }

  @Delete('all')
  @Version('1')
  removeAllBooks() {
    return this.booksService.removeAllBooks().then((res) => res);
  }
}
