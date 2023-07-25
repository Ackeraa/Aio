import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { GroupService } from '../group.service';

@Component({
	selector: 'app-group-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

	constructor(private groupService: GroupService) { }

	ngOnInit(): void {
	}

}
