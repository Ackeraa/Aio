import { Component, OnInit } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { UserService } from '../user.service';
import { AlertService } from '../../shared';

@Component({
  selector: 'app-user-connection-settings',
  templateUrl: './connection-settings.component.html',
  styleUrls: ['./connection-settings.component.scss'],
})
export class ConnectionSettingsComponent implements OnInit {
  codeforces: any;
  atcoder: any;
  poj: any;

  submitted: boolean;
  loading: boolean;

  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.userService.homeInfo$
      .pipe(
        filter((x) => x != null),
        map((x) => x.user.oj_accounts)
      )
      .subscribe((account) => {
        console.log(account);
        this.codeforces = {
          name: account?.codeforces?.name || '',
          password: account?.codeforces?.password || '',
        };
        this.atcoder = {
          name: account?.atcoder?.name || '',
          password: account?.atcoder?.password || '',
        };
        this.poj = {
          name: account?.poj?.name || '',
          password: account?.poj?.password || '',
        };
        this.loading = false;
      });
  }

  connect(which: string): void {
    this.loading = true;
    this.userService.connect(which, this[which]).subscribe(
      () => {
        this.loading = false;
        this.alertService.success(`Connect successful to ${which}`);
      },
      (err) => {
        this.loading = false;
        this.alertService.error(`Connect failed to ${which}`);
        this[which] = { name: '', password: '' };
      }
    );
  }

  onSubmit(): void {}
}
