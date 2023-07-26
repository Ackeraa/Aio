import { Component } from '@angular/core';
import {
  faUser,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../_services';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  myInfoIcon = faUser;
  exploreIcon = faSearch;

	constructor(private authService: AuthService) {

	}
	onSubmit():any {
		this.authService.get('problems').subscribe(
			res =>      console.log(res),
			error =>    console.log(error)
		);
	}

	ngOnInit(): void {
	}

}
