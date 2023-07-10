import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators'; 
import { AuthService } from '../_services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class HomeService {

	constructor(private authService: AuthService) { }
	
	getInfo(): Observable<any> {
		let url = 'homes';
		return this.authService.get(url);
	}
}
