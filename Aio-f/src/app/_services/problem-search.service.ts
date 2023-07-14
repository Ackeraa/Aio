import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators'; 
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class ProblemSearchService {

	source: string;
	query: string;

	constructor(private authService: AuthService) {
	}

	search(source: string, query: string): Observable<any> {
		this.source = source;
		this.query = query;

		let url: string;
		let params: any;

		if (query === "") {
			params = { source: source };
		} else {
			params = { source: source, query: query };
		}
		if (source === 'aio'){
			url = 'problems/search';
		} else {
			url = 'vproblems/search';
		}
		return this.authService.get(url, params);
	}

	getPage(page: number): Observable<any> {
		let url: string;
		let params: any;

		if (this.query === "") {
			params = { source: this.source, page: page };
		} else {
			params = { source: this.source, query: this.query, page: page };
		}
		if (this.source === 'aio'){
			url = 'problems/search';
		} else {
			url = 'vproblems/search';
		}
		return this.authService.get(url, params);
	}

	reSpideProblems(source: string): Observable<any> {
		let url = 'vproblems/respides';
		return this.authService.get(
			"vproblems/respides",
			{ source: source }
		);
	}
}
