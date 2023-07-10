import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators'; 
import { ContestService } from '../contest.service';
import { AuthService } from '../../_services';

@Component({
	selector: 'app-contest-my-submissions',
	templateUrl: './my-submissions.component.html',
	styleUrls: ['./my-submissions.component.scss']
})
export class MySubmissionsComponent implements OnInit {

	addition: any; 

	constructor(private authService: AuthService,
				private contestService: ContestService) {
	}

	ngOnInit(): void {
		combineLatest(this.contestService.contest$, this.authService.user$)
		.pipe(filter(([x, y]) => x != null && y != null))
		.subscribe(z => {
			this.addition = { contest_id: z[0].id, user_id: z[1].user_id };
			console.log(this.addition);
		});
	}
}
