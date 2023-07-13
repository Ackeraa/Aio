import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  faCalendarMinus,
  faCalendarPlus,
  faFolderPlus,
} from '@fortawesome/free-solid-svg-icons';

const BASE_URL = 'http://127.0.0.1:3000';

@Component({
	selector: 'app-contests',
	templateUrl: './contests.component.html',
	styleUrls: ['./contests.component.scss']
})
export class ContestsComponent implements OnInit{

	contests: any;
  recentIcon = faCalendarMinus;
  pastIcon = faCalendarPlus;
  createIcon = faFolderPlus;

	constructor(private http: HttpClient) {
		this.getContests();
	}

	getContests(): void {
		let url = BASE_URL + '/contests';
		this.http.get(url).subscribe(data => {
			this.contests = data;
		});
	}
	ngOnInit(): void {
	}

}
