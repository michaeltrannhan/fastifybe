import { Injectable, HttpException } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Book } from './books/entities/book.entity';

@Injectable()
export class AppService {
  constructor() { }
}
