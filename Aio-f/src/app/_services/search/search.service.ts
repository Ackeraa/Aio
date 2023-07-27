import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../_services';

export interface SearchParams {
  query?: string;
  addition?: { [key: string]: string };
  page?: number;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private params: SearchParams = {
    query: '',
    addition: {},
    page: 1,
  };

  constructor(private authService: AuthService) {}

  createExtParams(): any {
    const extParams: SearchParams = {
      query: this.params.query,
      page: this.params.page,
      ...this.params.addition,
    };
    return extParams;
  }

  get(url: string, params: SearchParams): Observable<any> {
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
