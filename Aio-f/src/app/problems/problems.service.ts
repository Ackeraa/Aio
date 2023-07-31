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

  createProblem(problem: any): any {
    return this.authService.post('/problems', problem);
  }
}
