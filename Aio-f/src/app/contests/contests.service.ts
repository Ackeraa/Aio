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

  getUser(): Observable<any> {
    return this.authService.user$;
  }

  getContests(url: string, params: SearchParams): Observable<any> {
    return this.searchService.get(url, params);
  }

  getContestsPage(): SearchParams {
    return { page: this.searchService.getPage() };
  }

  getContest(id: string): Observable<any> {
    return this.authService.get(`/contests/${id}`);
  }

  createContest(data: any): Observable<any> {
    return this.authService.post('/contests', data);
  }

  updateContest(id: string, data: any): Observable<any> {
    return this.authService.put(`/contests/${id}`, data);
  }

  deleteContest(id: string): Observable<any> {
    return this.authService.get(`/contests/${id}`);
  }
}
