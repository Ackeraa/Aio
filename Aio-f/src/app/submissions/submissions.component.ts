import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators'; 
import { ActionCableService, Channel } from 'angular2-actioncable';

@Component({
	templateUrl: './submissions.component.html',
	styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {

	constructor() {
	}

	ngOnInit(): void {
	}

}
