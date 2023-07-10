import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators'; 
import { UserService } from '../user.service';

@Component({
	selector: 'app-user-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	data: any;
	loading: boolean = true;

	constructor(private userService: UserService){
	}

	ngOnInit(): void {
		this.loading = true;
		this.userService.homeInfo$
			.pipe(filter(x => x != null))
			.subscribe(data => {
				this.loading = false;
				this.data = data;
			});
	}
}
