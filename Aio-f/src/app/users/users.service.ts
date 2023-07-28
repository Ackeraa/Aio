import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';
import { SearchService } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private authService: AuthService,
    private searchService: SearchService
  ) {}

  getPage(page: number): Observable<any> {
    return this.searchService.get('', { page });
  }
}
