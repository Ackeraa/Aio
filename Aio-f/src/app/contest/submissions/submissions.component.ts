import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators'; 
import { ContestService } from '../contest.service';

@Component({
	selector: 'app-problem-submissions',
	templateUrl: './submissions.component.html',
	styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {

	addition: any;

	constructor(private contestService: ContestService) {
	}

	ngOnInit(): void {
		this.contestService.contest$
			.pipe(filter(x => x != null))
		 	.subscribe(contest => this.addition = { contest_id: contest.id });
	}
}
