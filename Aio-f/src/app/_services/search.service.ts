import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators'; 
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class SearchService {

	query: string;
	uri: string;
	addition: any;

	constructor(private authService: AuthService) {
	}

	search(uri: string, query: string, addition: any): Observable<any> {
		this.uri = uri;
		this.query = query;
		this.addition = addition;

		let url = uri + '/search';
		let params = { search: { query: query, addition: addition } };

		return this.authService.get(url, params);
	}

	getPage(page: number): Observable<any> {
		let url = this.uri + '/search';
		let params = { search: { query: this.query, addition: this.addition, page: page } };
		return this.authService.get(url, params);
	}
}
