import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';
import { SearchService, SearchParams } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class ProblemSetsService {
  constructor(
    private authService: AuthService,
    private searchService: SearchService
  ) {}

  getProblemSets(url: string, params: SearchParams): Observable<any> {
    return this.searchService.get(url, params);
  }

  getProblemSetsPage(): SearchParams {
    return { page: this.searchService.getPage() };
  }

  createProblemSet(data: any): Observable<any> {
    return this.authService.post('/problem_sets', data);
  }
}
