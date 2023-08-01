import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { ActionCableService } from 'angular2-actioncable';
import { AuthService } from '../auth';
import { SearchService } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class ProblemService implements OnInit {
  id: string;
  problem$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  getProblem(source: string, id: string): void {
    this.id = id;
    let url: string;
    if (source === 'l') {
      url = '/problems/' + id;
    } else {
      url = '/vproblems/' + id;
    }
    this.authService.get(url).subscribe((problem) => {
      this.problem$.next(problem);
    });
  }

  reSpideProblem(): Observable<any> {
    let id;
    this.problem$.subscribe((problem) => {
      id = problem.id;
    });
    let url = '/vproblems/' + id + '/respide';
    return this.authService.get(url);
  }

  submitProblem(language: any, code: string): Observable<any> {
    return combineLatest(this.problem$, this.authService.user$).pipe(
      filter(([x, y]) => x != null && y != null),
      switchMap(([problem, user]) => {
        let url, body;
        if (problem.source == 'aio') {
          url = '/problems/' + problem.id + '/submit';
        } else {
          url = '/vproblems/' + problem.id + '/submit';
        }
        body = {
          language: language,
          code: code,
          user_id: user.user_id,
        };
        return this.authService.post(url, body);
      })
    );
  }

  deleteDatas(which: string): Observable<any> {
    let url = '/problems/delete_' + which;
    let data = { id: this.id };
    return this.authService.post(url, data);
  }
}
