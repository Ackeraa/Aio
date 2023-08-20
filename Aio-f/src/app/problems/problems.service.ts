import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';
import {
  ProblemSearchService,
  SearchParams,
  SearchService,
  ProblemSearchParams,
} from '../shared';

@Injectable({
  providedIn: 'root',
})
export class ProblemsService {
  constructor(
    private problemSearchService: ProblemSearchService,
    private searchService: SearchService,
    private authService: AuthService
  ) {}

  getPublicProblems(params: ProblemSearchParams): Observable<any> {
    return this.problemSearchService.get(params);
  }

  getPublicPage(): ProblemSearchParams {
    return { page: this.problemSearchService.getPage() };
  }

  getPrivateProblems(params: SearchParams): Observable<any> {
    return this.searchService.get('/problems/search', params);
  }

  getPrivatePage(): SearchParams {
    return { page: this.searchService.getPage() };
  }

  spideProblems(source: string): Observable<any> {
    return this.problemSearchService.spide(source);
  }

  getProblem(id: string): Observable<any> {
    return this.authService.get(`/problems/${id}`);
  }

  createProblem(problem: any): any {
    return this.authService.post('/problems', problem);
  }

  updateProblem(id: string, problem: any): any {
    return this.authService.put(`problems/${id}`, problem);
  }

  deleteProblem(id: number): any {
    return this.authService.delete(`problems/${id}`);
  }

  shareProblem(id: number): any {}
}
