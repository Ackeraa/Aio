import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, Observable, fromEvent } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProblemSetService } from './problem-set.service';

@Component({
	selector: 'app-problem-set',
	templateUrl: './problem-set.component.html',
	styleUrls: ['./problem-set.component.scss']
})
export class ProblemSetComponent implements OnInit {

	loading: boolean;
	allProblems: any;
	problems: Array<any>;
	p: number;
	total: number;

	constructor(private router: Router,
				private route: ActivatedRoute,
			    private problemSetService: ProblemSetService) {
	}

	ngOnInit(): void {
		let id = this.route.snapshot.paramMap.get("id");
		this.problemSetService.getProblems(id)
			.subscribe(problems => this.problems = problems);
		this.p = 1;
	}

	setAllProblems(data: any): void {
		this.allProblems = data.problems;
		this.total = data.total;
		this.p = 1;
	}

	getPage(page: number): void {
		this.problemSetService.getPage(page)
			.subscribe(data => {
				this.allProblems = data.problems;
				this.total = data.total;
				this.p = page;
			});
	}

	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	viewProblem(source: string, id: string): void {
		let url: string;
		if (source == "aio") {
			url = "/problem/l/" + id;
		} else {
			url = "/problem/v/" + id;
		}
		this.router.navigate([url]);
	}

	isAdded(id: string): boolean {
		return this.problems.filter(x => x.id === id).length > 0;
	}

	addProblem(id: string): void {
		this.problemSetService.addProblem(id)
			.subscribe(problems => this.problems = problems);
	}

	deleteProblem(id: string): void {
		this.problemSetService.deleteProblem(id)
			.subscribe(problems => this.problems = problems);
	}
}
