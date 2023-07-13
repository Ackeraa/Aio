import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators'; 
import {
  faUser,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../_services/auth.service';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

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
