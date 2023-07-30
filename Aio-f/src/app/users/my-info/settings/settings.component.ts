import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
	selector: 'app-user-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

	constructor(private userService: UserService) { }

	ngOnInit(): void {
	}

}
