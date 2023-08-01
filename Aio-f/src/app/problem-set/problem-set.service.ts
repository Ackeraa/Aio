import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';
import { ProblemSearchService, ProblemSearchParams } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class ProblemSetService {
  id: string;

  constructor(
    private authService: AuthService,
    private problemSearchService: ProblemSearchService
  ) {}

  getProblems(id: string): Observable<any> {
    this.id = id;
    let url = '/problem_sets/' + id + '/problems';
    return this.authService.get(url);
  }

  getAllProblems(params: ProblemSearchParams): Observable<any> {
    return this.problemSearchService.get(params);
  }

  getAllProblemsPage(): ProblemSearchParams {
    return { page: this.problemSearchService.getPage() };
  }

  addProblem(problem_id: string): Observable<any> {
    let url = '/problem_sets/' + this.id + '/add_problem/' + problem_id;
    return this.authService.get(url);
  }

  deleteProblem(problem_id: string): Observable<any> {
    let url = '/problem_sets/' + this.id + '/delete_problem/' + problem_id;
    return this.authService.get(url);
  }
}
