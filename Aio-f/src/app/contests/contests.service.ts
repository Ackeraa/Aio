import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';
import { SearchService, SearchParams } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class ContestsService {
  constructor(
    private searchService: SearchService,
    private authService: AuthService
  ) {}

  getContests(url: string, params: SearchParams): Observable<any> {
    return this.searchService.get(url, params);
  }

  getContestsPage(): SearchParams {
    return { page: this.searchService.getPage() };
  }

  createContest(data: any): Observable<any> {
    return this.authService.post('/contests', data);
  }
}
