import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  photo: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id') || null;
    this.userService.getInfo(id);
    this.userService.photo$.subscribe({
      next: (photo) => {
        this.photo = photo;
      },
    });
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
