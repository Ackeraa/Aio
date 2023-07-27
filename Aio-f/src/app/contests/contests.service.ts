import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, SearchService, SearchParams } from '../_services';

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

  getContestsPage(): number {
    return this.searchService.getPage();
  }

  createContests(data: any): Observable<any> {
    return this.authService.post('/contests', data);
  }
}
