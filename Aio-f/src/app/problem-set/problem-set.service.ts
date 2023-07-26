import { Injectable, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { AuthService, ProblemSearchService } from '../_services';

@Injectable({
  providedIn: 'root',
})
export class ProblemSetService {
  id: string;

  constructor(
    private authService: AuthService,
    private problemSearchService: ProblemSearchService
  ) {}

  getPage(page: number): Observable<any> {
    return this.problemSearchService.get({ page });
  }

  getProblems(id: string): Observable<any> {
    this.id = id;
    let url = 'problem_sets/' + id + '/problems';
    return this.authService.get(url);
  }

  addProblem(problem_id: string): Observable<any> {
    let url = 'problem_sets/' + this.id + '/add_problem/' + problem_id;
    return this.authService.get(url);
  }

  deleteProblem(problem_id: string): Observable<any> {
    let url = 'problem_sets/' + this.id + '/delete_problem/' + problem_id;
    return this.authService.get(url);
  }
}
