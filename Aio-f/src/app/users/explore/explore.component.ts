import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
	selector: 'app-explore',
	templateUrl: './explore.component.html',
	styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

	uri: string = 'users';
	users: Array<any>;
	loading: boolean;
	p: number;
	total: number;

	constructor(private usersService: UsersService) {
	}

	ngOnInit(): void {
	}

	setUsers(data: any): void {
		this.users = data.users;
		this.total = data.total;
	}

	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	getPage(page: number): void {
		this.usersService.getPage(page)
		.subscribe(data => {
			this.users = data.users;
			this.total = data.total;
			this.p = page;
		});
	}

}
