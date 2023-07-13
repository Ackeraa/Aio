import { Component, OnInit } from '@angular/core';
import { ProblemSetsService } from '../problem-sets.service';

@Component({
	selector: 'app-public',
	templateUrl: './public.component.html',
	styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {


	uri: string = 'problem_sets';
	addition: string = 'public';
	loading: boolean;
	problemSets: Array<any>;
	p: number;
	total: number;

	constructor(private problemSetsService: ProblemSetsService) { }

	ngOnInit(): void {
	}

	setProblemSets(data: any): void {
		this.problemSets = data.problem_sets;
		this.total = data.total;
	}

	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	getPage(page: number): void {
		this.problemSetsService.getPage(page)
			.subscribe(data => {
				this.problemSets = data.problemSets;
				this.total = data.total;
				this.p = page;
			});
	}
}
