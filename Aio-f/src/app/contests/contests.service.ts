import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../_services';
import { SearchService } from '../_modules';

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
