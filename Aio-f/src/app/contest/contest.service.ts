import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { ActionCableService, Channel } from 'angular2-actioncable';
import { AuthService } from '../auth';
import { ProblemSearchService, ProblemSearchParams } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class ContestService implements OnInit {
  id: string;
  problems$: BehaviorSubject<any> = new BehaviorSubject(null);
  contest$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private authService: AuthService,
    private cableService: ActionCableService,
    private problemSearchService: ProblemSearchService
  ) {}

  ngOnInit() {}

  getData(id: string): void {
    this.id = id;
    let url = '/contests/' + id + '/problems';
    this.authService.get(url).subscribe((data) => {
      this.contest$.next(data.contest);
      this.problems$.next(data.problems);
    });
  }

  getAllProblems(params: ProblemSearchParams): Observable<any> {
    return this.problemSearchService.get(params);
  }

  getAllProblemsPage(): ProblemSearchParams {
    return { page: this.problemSearchService.getPage() };
  }

  spideAllProblems(source: string): Observable<any> {
    return this.problemSearchService.spide(source);
  }

  addProblem(problem_id: number): void {
    this.authService
      .get(`/contests/${this.id}/add_problem/${problem_id}`)
      .subscribe({
        next: (problems) => {
          this.problems$.next(problems);
        },
      });
  }

  deleteProblem(problem_id: string): void {
    let url = '/contests/' + this.id + '/delete_problem/' + problem_id;
    this.authService.get(url).subscribe((problems) => {
      this.problems$.next(problems);
    });
  }

  submitProblem(index: number, language: any, code: string): Observable<any> {
    return this.problems$.pipe(
      filter((x) => x != null),
      switchMap((problems) => {
        let url, body;
        if (problems[index].source == 'aio') {
          url = '/problems/' + problems[index].id + '/submit';
        } else {
          url = '/vproblems/' + problems[index].id + '/submit';
        }
        const user = JSON.parse(localStorage.getItem('user'));
        body = {
          language: language,
          code: code,
          contest_id: this.id,
          user_id: user.id,
          user_name: user.name,
          contest_problem_id: index,
        };
        return this.authService.post(url, body);
      })
    );
  }

  getRanks(): Observable<any> {
    return this.problems$.pipe(
      filter((x) => x != null),
      switchMap(() => {
        let url = '/acm_contest_ranks/get_contest_rank';
        let params = { contest_id: this.id };
        return this.authService.get(url, params);
      })
    );
  }

  getRanksChannel(): Observable<any> {
    return this.problems$.pipe(
      filter((x) => x != null),
      switchMap(() => {
        let url = 'ws://127.0.0.1:3000/cable';
        let channel = 'RanksChannel';
        let params = {
          contest_id: this.id,
        };
        return this.cableService.cable(url).channel(channel, params).received();
      })
    );
  }
}
