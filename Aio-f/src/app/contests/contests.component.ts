import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-contests',
	templateUrl: './contests.component.html',
	styleUrls: ['./contests.component.scss']
})
export class ContestsComponent implements OnInit{

	contests: any;

	constructor(private http: HttpClient) {
		this.getContests();
	}

	getContests(): void {
		this.http.get('/contests').subscribe(data => {
			this.contests = data;
		});
	}
	ngOnInit(): void {
	}

}
