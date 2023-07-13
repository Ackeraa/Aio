import { Component, OnInit } from '@angular/core';
import { ContestsService } from '../contests.service';

@Component({
	selector: 'app-contests-past',
	templateUrl: './past.component.html',
	styleUrls: ['./past.component.scss']
})
export class PastComponent implements OnInit {

	uri: string = 'contests';
	addition: string = 'recent';
	loading: boolean;
	contests: Array<any>;
	p: number;
	total: number;

	constructor(private contestsService: ContestsService) {
	}

	ngOnInit(): void {
	}

	setContests(data: any): void {
		this.contests = data.contests;
		this.contests.map(contest => {
			let start_day = new Date(contest.start_time).getDay();
			let end_day = new Date(contest.end_time).getDay();
			contest.days = end_day - start_day;
			return contest;
		});
		this.total = data.total;
	}

	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	getPage(page: number): void {
		this.contestsService.getPage(page)
			.subscribe(data => {
				this.contests = data.contests;
				this.total = data.total;
				this.p = page;
			});
	}
}
