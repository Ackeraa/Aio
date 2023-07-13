import { Component, OnInit } from '@angular/core';
import {
  faUserCheck,
  faUserLock,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-problem-sets',
  templateUrl: './problem-sets.component.html',
  styleUrls: ['./problem-sets.component.scss']
})
export class ProblemSetsComponent implements OnInit {

  privateIcon = faUserLock;
  publicIcon = faUserCheck;
  createIcon = faUserPlus;

  constructor() {

  }

  ngOnInit(): void {
  }

}
