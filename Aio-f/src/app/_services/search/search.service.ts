import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../_services';

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
    const extParams: Params = {
      query: this.params.query,
      page: this.params.page,
      addition: { ...this.params.addition },
    };
    return extParams;
  }

  get(params: Params, url?: string): Observable<any> {
    this.url = url || this.url;
    this.params = {
      query: params.query !== undefined ? params.query : this.params.query,
      addition: params.addition || this.params.addition,
      page: params.page || this.params.page,
    };

    return this.authService.get(url, this.createExtParams());
  }

  getQuery(): string {
    return this.params.query;
  }

  getPage(): number {
    return this.params.page;
  }

  getAddition(): any {
    return { ...this.params.addition };
  }
}
