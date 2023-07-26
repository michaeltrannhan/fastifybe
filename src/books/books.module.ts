import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { SearchModule } from 'src/search/search.module';
import { SearchService } from 'src/search/search.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, SearchModule],
  controllers: [BooksController],
  providers: [BooksService, SearchService],
  exports: [BooksService],
})
export class BooksModule {}
