import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators'; 
import { AngularTokenService } from 'angular-token';
import { AuthService } from '../_services';
import { SearchService } from '../_services';

@Injectable({
	providedIn: 'root'
})
export class ContestsService {

	constructor(private searchService: SearchService,
				private authService: AuthService) {
	}

	getPage(page: number): Observable<any> {
		return this.searchService.getPage(page);
	}

	create(data: any): Observable<any> {
		let url = 'contests';
		return this.authService.post(url, data);
	}
}
