import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators'; 
import { AuthService } from '../_services';
import { ProblemSearchService } from '../_services';

@Injectable({
	providedIn: 'root'
})
export class ProblemsService {

	constructor(private authService: AuthService,
				private ProblemSearchService: ProblemSearchService) {
  }
	
	getPage(page: number): Observable<any> {
		return this.ProblemSearchService.getPage(page);
	}
}
