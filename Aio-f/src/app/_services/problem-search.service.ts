import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

interface ProblemSearchParams {
  source: string;
  query?: string;
  page?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProblemSearchService {
  private source: string;
  private query: string;

  constructor(private authService: AuthService) {}

  private createURL(source: string): string {
    return source === 'aio' ? '/problems/search' : '/vproblems/search';
  }

  private createParams(
    source: string,
    query?: string,
    page?: number
  ): ProblemSearchParams {
    let params: ProblemSearchParams = { source: source };
    if (query) {
      params.query = query;
    }
    if (page) {
      params.page = page;
    }
    return params;
  }

  search(source: string, query: string): Observable<any> {
    this.source = source;
    this.query = query;

    return this.authService.get(
      this.createURL(source),
      this.createParams(source, query)
    );
  }

  getPage(page: number): Observable<any> {
    return this.authService.get(
      this.createURL(this.source),
      this.createParams(this.source, this.query, page)
    );
  }

  reSpide(source: string): Observable<any> {
    return this.authService.get(
      '/vproblems/respides',
      this.createParams(source)
    );
  }
}
