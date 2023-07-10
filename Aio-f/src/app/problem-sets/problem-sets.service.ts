import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators'; 
import { AuthService } from '../_services';
import { SearchService } from '../_services';

@Injectable({
	providedIn: 'root'
})
export class ProblemSetsService {

	constructor(private authService: AuthService,
				private searchService: SearchService) {
	}

	getPage(page: number): Observable<any> {
		return this.searchService.getPage(page);
	}

	create(data: any): Observable<any> {
		let url = 'problem_sets';
		return this.authService.post(url, data);
	}
}
