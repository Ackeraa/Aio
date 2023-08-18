import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { UsersService } from '../users.service';
import { SearchParams, AlertService } from '../../shared';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent {
  users: Array<any>;
  loading: boolean;
  p: number;
  total: number;

  constructor(
    private usersService: UsersService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getUsers(this.usersService.getUsersPage());
  }

  getUsers(params: SearchParams): void {
    this.p = params.page;
    console.log(this.p);
    this.loading = true;
    this.usersService
      .getUsers(params)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.users = data.users;
          this.total = data.total;
        },
        error: (err) => {
          this.alertService.error(err);
        },
      });
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id).subscribe({
      next: () => {
        this.alertService.success('success');
      },
      error: (err) => {
        this.alertService.error(err);
      },
    });
  }
}
