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

  getProblemSet(id: string): Observable<any> {
    return this.authService.get(`/problem_sets/${id}`);
  }

  createProblemSet(data: any): Observable<any> {
    return this.authService.post('/problem_sets', data);
  }

  updateProblemSet(id: string, data: any): Observable<any> {
    return this.authService.put(`problem_sets/${id}`, data);
  }

  deleteProblemSet(id: string): Observable<any> {
    return this.authService.delete(`problem_sets/${id}`);
  }
}
