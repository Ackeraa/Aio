import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { AuthService, SearchService } from '../_services';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  query: string;

  constructor(
    private searchService: SearchService,
    private authService: AuthService
  ) {}

  getPage(page: number): Observable<any> {
    return this.searchService.get('', { page });
  }
}
