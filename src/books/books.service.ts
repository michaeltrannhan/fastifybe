import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { SearchService } from 'src/search/search.service';
import { UpdateAllBookFieldsDto } from './dto/update-all-book-fields.dto';

@Injectable()
export class BooksService {
  constructor(private readonly elasticsearchService: SearchService) {}

  async createBook(book: CreateBookDto) {
    return await this.elasticsearchService.insertBook(book);
  }

  async bulkInsert(books: CreateBookDto[]) {
    return await this.elasticsearchService.bulkInsert(books);
  }

  findAll() {
    return this.elasticsearchService.searchAllBooks();
  }

  async findOne(id: number) {
    return await this.elasticsearchService.searchIndex(id.toString());
  }

  update(id: number, fields: UpdateAllBookFieldsDto) {
    return this.elasticsearchService.updateAllFields(id.toString(), fields);
  }

  updateFields(id: number, fields: UpdateBookDto) {
    return this.elasticsearchService.updateBook(id.toString(), fields);
  }
  remove(id: number) {
    return this.elasticsearchService.deleteBook(id.toString());
  }

  removeAllBooks() {
    return this.elasticsearchService.deleteAllBooks();
  }
}
