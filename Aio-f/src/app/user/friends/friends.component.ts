import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent {
  followers: any;
  following: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.friends$
      .pipe(filter((x) => x != null))
      .subscribe((friends) => {
        this.followers = friends.followers;
        this.following = friends.following;
      });
  }
}
