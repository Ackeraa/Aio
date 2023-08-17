import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { AlertService } from '../../shared';
import { ContestService } from '../contest.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent {
  contest: any;
  loading: boolean;

  constructor(
    private contestService: ContestService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.contestService.contest$
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: contest => {
          this.contest = contest;
        },
        error: err => {
          this.alertService.error(err);
        },
      });
  }
}
