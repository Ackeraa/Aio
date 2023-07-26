import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../_services';
import { th } from 'date-fns/locale';

interface Params {
  query?: string;
  addition?: { [key: string]: string };
  page?: number;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private params: Params = {
    query: '',
    addition: {},
    page: 1,
  };
  private url: string;

  constructor(private authService: AuthService) {}

  createExtParams(): any {
    const extParams = {};
    extParams['query'] = this.params.query;
    extParams['page'] = this.params.page;
    Object.keys(this.params.addition).forEach(key => {
      extParams[key] = this.params.addition[key];
    });

    return extParams;
  }

  get(params: Params, url?: string): Observable<any> {
    this.url = url || this.url;
    this.params.query = params.query || this.params.query;
    this.params.addition = params.addition || this.params.addition;
    this.params.page = params.page || this.params.page;

    console.log('search service', url, this.createExtParams());

    return this.authService.get(url, this.createExtParams());
  }

  getQuery(): string {
    return this.params.query;
  }

  getPage(): number {
    return this.params.page;
  }

  getAddition(): any {
    return this.params.addition;
  }
}
