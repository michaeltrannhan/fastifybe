import { BookSearchBody } from './BookSearchBody.interface';
export interface BookSearchResponse {
  hits: {
    total: number;
    hits: Array<{
      _source: BookSearchBody;
    }>;
  };
}
