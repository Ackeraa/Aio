import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../_services';

interface Params {
  query?: string;
  addition?: any;
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
  private uri: string;

  constructor(private authService: AuthService) {}

  get(params: Params, uri?: string): Observable<any> {
    console.log('search service', this.params);
    this.uri = uri || this.uri;
    this.params.query = params.query || this.params.query;
    this.params.addition = params.addition || this.params.addition;
    this.params.page = params.page || this.params.page;
    const url = `/${this.uri}/search`;

    console.log(this.params);
    return this.authService.get(url, this.params);
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
