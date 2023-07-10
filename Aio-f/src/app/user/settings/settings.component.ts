import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators'; 
import { UserService } from '../user.service';

@Component({
	selector: 'app-user-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

	constructor(private userService: UserService) { }

	ngOnInit(): void {
	}

}
