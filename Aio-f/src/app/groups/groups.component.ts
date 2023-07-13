import { Component, OnInit } from '@angular/core';
import { 
  faUser,
  faSearch
} from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-groups',
	templateUrl: './groups.component.html',
	styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit {

  myGroupsIcon = faUser;
  exploreIcon = faSearch;

	constructor (){
	}

	ngOnInit(): void {

	}
}
