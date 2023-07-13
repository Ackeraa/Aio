import { Component, OnInit } from '@angular/core';
import {
  faSpider,
  faFlask,
  faFolderPlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-problems',
	templateUrl: './problems.component.html',
	styleUrls: ['./problems.component.scss']
})
export class ProblemsComponent implements OnInit {

  collectionIcon = faSpider;
  betaIcon = faFlask;
  createIcon = faFolderPlus;

	constructor() { }

	ngOnInit(): void {

	}

}
