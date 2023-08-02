import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';
import { ProblemSearchService, ProblemSearchParams } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class ProblemsService {
  constructor(
    private problemSearchService: ProblemSearchService,
    private authService: AuthService
  ) {}

  getPublicProblems(params: ProblemSearchParams): Observable<any> {
    return this.problemSearchService.get(params);
  }

  getPublicPage(): ProblemSearchParams {
    return { page: this.problemSearchService.getPage() };
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

  deleteProblem(id: string): any {
    return this.authService.delete(`problems/${id}`);
  }
}
