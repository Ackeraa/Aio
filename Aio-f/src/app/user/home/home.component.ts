import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  data: any;
  loading: boolean;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loading = true;
    this.userService.homeInfo$.pipe(filter((x) => x != null)).subscribe({
      next: (data) => {
        this.loading = false;
        this.data = data;
      },
    });
  }
}
