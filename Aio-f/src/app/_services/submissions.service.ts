import { Injectable } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators'; 
import { AngularTokenService } from 'angular-token';
import { ActionCableService, Channel } from 'angular2-actioncable';
import { SearchService } from './search.service';

@Injectable({
	providedIn: 'root'
})
export class SubmissionsService {

	constructor(private searchService: SearchService,
				private cableService: ActionCableService,
				private tokenService: AngularTokenService){
	}

	getSubmissionsChannel(params: any): Observable<any> {
		let url = 'ws://127.0.0.1:3000/cable';
		let channel = 'SubmissionsChannel';
		return this.cableService
		   .cable(url, params)
		   .channel(channel)
		   .received();
	}

	getSubmissionsPage(page: number) :Observable<any> {
		return this.searchService.getPage(page);
	}
}
