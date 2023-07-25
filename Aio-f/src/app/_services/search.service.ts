import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

interface Params {
  query: string;
  addition: any;
  page?: number;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  query: string;
  uri: string;
  addition: any;

  constructor(private authService: AuthService) {}

  createURL(): string {
    return `${this.uri}/search`;
  }

  createParams(page?: number): Params {
    const params = {
      query: this.query,
      addition: this.addition,
      ...(page && { page }),
    };
    return params;
  }

  search(uri: string, query: string, addition: any): Observable<any> {
    this.uri = uri;
    this.query = query;
    this.addition = addition;

    return this.authService.get(this.createURL(), this.createParams());
  }

  getPage(page: number): Observable<any> {
    return this.authService.get(this.createURL(), this.createParams(page));
  }
}
