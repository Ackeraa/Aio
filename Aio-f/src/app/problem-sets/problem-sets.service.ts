import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, SearchService } from '../_services';

@Injectable({
  providedIn: 'root',
})
export class ProblemSetsService {
  constructor(
    private authService: AuthService,
    private searchService: SearchService
  ) {}

  getPage(page: number): Observable<any> {
    return this.searchService.get('', { page });
  }

  create(data: any): Observable<any> {
    let url = 'problem_sets';
    return this.authService.post(url, data);
  }
}
