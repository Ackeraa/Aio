import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators'; 

BASE_URL = 'http://127.0.0.1:3000';

@Injectable({
	providedIn: 'root'
})
export class CreateService {
	
	constructor(private http: HttpClient) {

	}
	submit(problem: any): void {
		this.http
			.post(BASE_URL + '/problems',
				  JSON.stringify(problem))
			.subscribe(data => {
				console.log(data)
			});
	}
}

