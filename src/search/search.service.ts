import {
  BulkRequest,
  BulkResponse,
  GetResponse,
  UpdateResponse,
} from '@elastic/elasticsearch/lib/api/types';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { UpdateAllBookFieldsDto } from 'src/books/dto/update-all-book-fields.dto';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';
import { Book } from 'src/books/entities/book.entity';
import { BookSearchBody } from 'src/books/types/BookSearchBody.interface';
import { BookSearchResponse } from 'src/books/types/BookSearchResponse.interface';

@Injectable()
export class SearchService {
  index = 'books';
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async insertBook(book: CreateBookDto) {
    console.log('inserting books');
    let res;
    try {
      res = await this.elasticsearchService.index<BookSearchBody>({
        index: this.index,
        id: book.id.toString(),
        op_type: 'create',
        body: book,
      });
    } catch (err) {
      throw new BadRequestException({
        status: HttpStatus.CONFLICT,
        message: 'Book already exists',
      });
    }
    return res;
  }

  async bulkInsert(books: Book[]) {
    let res: BulkResponse;
    try {
      const bulk = [];
      books.forEach((book) => {
        bulk.push({
          index: {
            _id: book.id,
            _index: 'books',
          },
        });
        bulk.push(book);
      });
      res = await this.elasticsearchService.bulk({
        index: this.index,
        body: bulk,
      });
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  async searchIndex(q: string) {
    let res: GetResponse<BookSearchBody>;
    try {
      res = await this.elasticsearchService.get({
        index: this.index,
        id: q,
      });
      return res._source;
    } catch (err) {
      throw new BadRequestException({
        status: HttpStatus.NOT_FOUND,
        message: 'Book not found',
      });
    }
  }

  async updateBook(id: string, partialUpdate: UpdateBookDto) {
    let res: UpdateResponse;
    try {
      res = await this.elasticsearchService.update({
        index: this.index,
        id: id,
        body: {
          doc: partialUpdate,
        },
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
    return res;
  }

  async updateAllFields(id: string, book: UpdateAllBookFieldsDto) {
    let res: UpdateResponse;
    try {
      res = await this.elasticsearchService.update({
        index: this.index,
        id: id,
        doc: book,
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
    return res;
  }

  async searchAllBooks() {
    return await this.elasticsearchService
      .search({
        index: this.index,
      })
      .then((res) => res.hits.hits.map((book) => book._source));
  }

  async deleteBook(id: string) {
    return this.elasticsearchService.delete({
      index: this.index,
      id: id,
    });
  }

  async deleteAllBooks() {
    return await this.elasticsearchService.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match_all: {},
        },
      },
    });
  }
}
