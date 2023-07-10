import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators'; 
import { GroupService } from '../group.service';

@Component({
	selector: 'app-group-contests',
	templateUrl: './contests.component.html',
	styleUrls: ['./contests.component.scss']
})
export class ContestsComponent implements OnInit {

	contests: any;

	constructor(private groupService: GroupService) { }

	ngOnInit(): void {
		this.groupService.contests$
			.pipe(filter(x => x != null))
			.subscribe(contests =>{
				console.log(contests);
				this.contests = contests;
			});
	}

}
