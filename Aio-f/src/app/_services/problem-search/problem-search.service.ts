import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../_services';
import { environment } from 'src/environments/environment';

interface Params {
  source?: string;
  query?: string;
  page?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProblemSearchService {
  private params: Params = {
    source: environment.vproblemsSources[0],
    query: '',
    page: 1,
  };

  constructor(private authService: AuthService) {}

  //FIXME: should reset page to 1 when source or query changes.
  get(params: Params): Observable<any> {
    this.params = {
      source: params.source || this.params.source,
      query: params.query || this.params.query,
      page: params.page || this.params.page,
    };
    const url =
      this.params.source === 'aio' ? '/problems/search' : '/vproblems/search';

    return this.authService.get(url, this.params);
  }

  reSpide(source: string): Observable<any> {
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
