import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, SearchService } from '../_services';

@Injectable({
  providedIn: 'root',
})
export class ContestsService {
  constructor(
    private searchService: SearchService,
    private authService: AuthService
  ) {}

  getContests(page: number): Observable<any> {
    return this.searchService.get({ page });
  }

  createContests(data: any): Observable<any> {
    return this.authService.post('/contests', data);
  }
}
