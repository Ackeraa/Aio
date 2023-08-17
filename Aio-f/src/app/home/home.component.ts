import { Component } from '@angular/core';
import { AlertService } from '../shared';
import { HomeService } from './home.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  data: any;
  loading: boolean;

  constructor(
    private homeService: HomeService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.homeService
      .getInfo()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: data => {
          this.data = data;
        },
        error: err => {
          this.alertService.error(err);
        },
      });
  }
}
