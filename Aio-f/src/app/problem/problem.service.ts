import { Injectable, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators'; 
import { ActionCableService, Channel } from 'angular2-actioncable';
import { AuthService } from '../_services';
import { SearchService } from '../_services';

@Injectable({
	providedIn: 'root'
})
export class ProblemService implements OnInit {

	problem$: BehaviorSubject<any> = new BehaviorSubject(null);

	constructor(private authService: AuthService,
				private searchService: SearchService,
				private cableService: ActionCableService) {
	}

	ngOnInit() {
	}

	getProblem(source: string, id: string): void {
		let url: string;
		if (source === 'aio') {
			url = 'problems/' + id;
		} else {
			url = 'vproblems/' + id;
		}
		this.authService.get(url)
			.subscribe(problem => {
				this.problem$.next(problem);
			});
	}

	reSpideProblem(): Observable<any> {
		let id;
		this.problem$
		    .subscribe( problem => {
				id = problem.id;
			});
		let url = 'vproblems/' + id + '/respide';
		return this.authService.get(url);
	}

	submitProblem(language: any, code: string): Observable<any> {
		return combineLatest(this.problem$, this.authService.user$)
			.pipe(
				filter(([x, y]) => x != null && y != null),
			    switchMap(([problem, user]) => {
					let url, body;
					if (problem.source == 'aio') {
						url = 'problems/' + problem.id + '/submit';
					} else {
						url = 'vproblems/' + problem.id + '/submit';
					} 
					body = {
						language: language,
						code: code,
						user_id: user.user_id
					};
          console.log("FFF", body);
					return this.authService.post(url, body)
				})
			);
	}

}
