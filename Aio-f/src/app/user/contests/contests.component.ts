import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators'; 
import { UserService } from '../user.service';

@Component({
	selector: 'app-user-contests',
	templateUrl: './contests.component.html',
	styleUrls: ['./contests.component.scss']
})
export class ContestsComponent implements OnInit {

	contests: any;

	constructor(private userService: UserService) { }

	ngOnInit(): void {
		this.userService.contests$
			.pipe(filter(x => x != null))
			.subscribe(contests => this.contests = contests);
	}
}
