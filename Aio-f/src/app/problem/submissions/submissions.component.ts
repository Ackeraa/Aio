import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators'; 
import { ProblemService } from '../problem.service';

@Component({
	selector: 'app-problem-submissions',
	templateUrl: './submissions.component.html',
	styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {

	addition: any;

	constructor(private problemService: ProblemService) {

	}

	ngOnInit(): void {
		this.problemService.problem$
			.pipe(filter(x => x != null))
			.subscribe(problem => {
				this.addition = { problem_id: problem.id };
			});
	}

}
