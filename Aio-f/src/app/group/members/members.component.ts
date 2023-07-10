import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators'; 
import { GroupService } from '../group.service';

@Component({
	selector: 'app-group-members',
	templateUrl: './members.component.html',
	styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

	members: any;

	constructor(private groupService: GroupService) { }

	ngOnInit(): void {
		this.groupService.members$
			.pipe(filter(x => x != null))
			.subscribe(members => this.members = members);
	}

}
