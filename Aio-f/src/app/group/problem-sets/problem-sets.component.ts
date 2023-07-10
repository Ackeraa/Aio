import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators'; 
import { GroupService } from '../group.service';

@Component({
	selector: 'app-group-problem-sets',
	templateUrl: './problem-sets.component.html',
	styleUrls: ['./problem-sets.component.scss']
})
export class ProblemSetsComponent implements OnInit {

	problemSets: any;

	constructor(private groupService: GroupService) { }

	ngOnInit(): void {
		this.groupService.problemSets$
			.pipe(filter(x => x != null))
			.subscribe(problemSets => this.problemSets = problemSets);
	}

}
