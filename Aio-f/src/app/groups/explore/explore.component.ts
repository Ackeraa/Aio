import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../groups.service';

@Component({
	selector: 'app-groups-explore',
	templateUrl: './explore.component.html',
	styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

	uri: string = 'groups';
	groups: Array<any>;
	loading: boolean;
	p: number;
	total: number;

	constructor(private groupsService: GroupsService) {
	}

	ngOnInit(): void {
	}

	setGroups(data: any): void {
		this.groups = data.groups;
		this.total = data.total;
	}
	
	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	getPage(page: number): void {
		this.groupsService.getPage(page)
			.subscribe(data => {
				this.groups = data.groups;
				this.total = data.total;
				this.p = page;
			});
	}

}
