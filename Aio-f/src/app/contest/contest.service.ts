import { Injectable, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators'; 
import { ActionCableService, Channel } from 'angular2-actioncable';
import { AuthService } from '../_services';
import { ProblemSearchService } from '../_services';

@Injectable({
	providedIn: 'root'
})
export class ContestService implements OnInit {

	id: string;
	problems$: BehaviorSubject<any> = new BehaviorSubject(null);
	contest$: BehaviorSubject<any> = new BehaviorSubject(null);

	constructor(private authService: AuthService,
				private cableService: ActionCableService,
			    private problemSearchService: ProblemSearchService) {
	}

	ngOnInit() {
	}

	getData(id: string): void {
		this.id = id;
		let url = 'contests/' + id + '/problems';
		this.authService.get(url)
			.subscribe(data => {
				this.contest$.next(data.contest);
				this.problems$.next(data.problems);
			});
	}

	getPage(page: number): Observable<any> {
		return this.problemSearchService.getPage(page);
	}

	addProblem(problem_id: string): void {
		let url = 'contests/' + this.id + '/add_problem/' + problem_id;
		this.authService.get(url)
			.subscribe(problems => {
				this.problems$.next(problems);
			});
	}

	deleteProblem(problem_id: string): void {
		let url = 'contests/' + this.id + '/delete_problem/' + problem_id;
		this.authService.get(url)
			.subscribe(problems => {
				this.problems$.next(problems);
			});
	}

	submitProblem(index: number, language: any, code: string): Observable<any> {
		return combineLatest(this.problems$, this.authService.user$)
			.pipe(
				filter(([x, y]) => x != null && y != null),
			    switchMap(([problems, user]) => {
					let url, body;
					if (problems[index].source == 'aio') {
						url = 'problems/' + problems[index].id + '/submit';
					} else {
						url = 'vproblems/' + problems[index].id + '/submit';
					} 
					body = {
						language: language,
						code: code,
						contest_id: this.id,
						user_id: user.user_id,
						user_name: user.user_name,
						contest_problem_id: index
					};
					return this.authService.post(url, body)
				})
			);
	}

	getRanks(): Observable<any> {
		return this.problems$
		    .pipe(
				filter(x => x != null),
				switchMap(() => {
					let url = 'acm_contest_ranks/get_contest_rank';
					let params = { contest_id: this.id };
					return this.authService.get(url, params)
				})
			);
	}

	getRanksChannel(): Observable<any> {
		return this.problems$
		    .pipe(
				filter(x => x != null),
				switchMap(() => {
					let url = 'ws://127.0.0.1:3000/cable';
					let channel = 'RanksChannel';
					let params = {
						contest_id: this.id
					};
					return this.cableService
					   .cable(url)
					   .channel(channel, params)
					   .received()
					})
			);
	}
}
