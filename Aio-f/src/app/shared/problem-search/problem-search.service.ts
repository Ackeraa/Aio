import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth';
import { environment } from 'src/environments/environment';

export interface ProblemSearchParams {
  source?: string;
  query?: string;
  page?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProblemSearchService {
  private params: ProblemSearchParams = {
    source: environment.problemsSources[0],
    query: '',
    page: 1,
  };

  constructor(private authService: AuthService) {}

  get(params: ProblemSearchParams): Observable<any> {
    this.params = {
      source: params.source || this.params.source,
      query: params.query !== undefined ? params.query : this.params.query,
      page: params.page || this.params.page,
    };
    console.log(this.params, params);

    return this.authService.get('/problems', this.params);
  }

  spide(source: string): Observable<any> {
    return this.authService.get('/vproblems/respides', { source });
  }

  getSource(): string {
    return this.params.source;
  }

  getQuery(): string {
    return this.params.query;
  }

  getPage(): number {
    return this.params.page;
  }
}
