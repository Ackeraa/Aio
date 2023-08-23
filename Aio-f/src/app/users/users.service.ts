import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';
import { SearchService, SearchParams } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private searchService: SearchService,
    private authService: AuthService
  ) {}

  getUsers(params: SearchParams): Observable<any> {
    return this.searchService.get('/users', params);
  }

  getUsersPage(): SearchParams {
    return { page: this.searchService.getPage() };
  }

  deleteUser(id: number): Observable<any> {
    return this.authService.delete(`/users/${id}$`);
  }
}
