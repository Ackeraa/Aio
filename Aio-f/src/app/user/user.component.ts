import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {

	photo: any = "http://39.106.54.201:3000/users/27/get_photo";

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id') || '';
    this.userService.getUser(id);
  }

  getContests(): void {
    this.userService.getContests();
  }

  getProblems(): void {
    this.userService.getProblems();
  }

  getGroups(): void {
    this.userService.getGroups();
  }

  getFriends(): void {
    this.userService.getFriends();
  }
}
