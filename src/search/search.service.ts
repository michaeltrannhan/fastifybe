import {
  BulkRequest,
  BulkResponse,
  GetResponse,
  IndexResponse,
  UpdateResponse,
} from '@elastic/elasticsearch/lib/api/types';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  HttpCode,
  Injectable,
} from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { create } from 'domain';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { UpdateAllBookFieldsDto } from 'src/books/dto/update-all-book-fields.dto';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';
import { Book } from 'src/books/entities/book.entity';
import { BookSearchBody } from 'src/books/types/BookSearchBody.interface';

@Injectable()
export class SearchService {
  index = 'books';
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async insertBook(book: CreateBookDto) {
    let res: IndexResponse;
    try {
      res = await this.elasticsearchService.index<BookSearchBody>({
        index: this.index,
        id: book.id.toString(),
        op_type: 'create',
        document: book,
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
      const bulk: BulkRequest<Book, any> = { operations: [] };
      bulk.operations = books.map((book) => {
        return {
          index: {
            _id: book.id.toString(),
            _index: 'books',
          },
          _source: book,
        };
      });
      res = await this.elasticsearchService.bulk(bulk);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
    return res;
  }

  async searchAllBooks() {
    return await this.elasticsearchService
      .search<Book[]>({
        index: this.index,
        sort: 'id:asc',
        size: 100,
      })
      .then((res) => res.hits.hits.map((book) => book._source));
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
    let res: UpdateResponse<Book>;
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
    let res: UpdateResponse<Book>;
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
