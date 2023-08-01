import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { AlertService, SearchParams } from '../../shared';
import { ContestsService } from '../contests.service';

@Component({
  selector: 'app-contests-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.scss'],
})
export class PastComponent {
  loading: boolean;
  contests: Array<any>;
  p: number;
  total: number;

  constructor(
    private contestsService: ContestsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getContests(this.contestsService.getContestsPage());
  }

  getContests(params: SearchParams): void {
    this.loading = true;
    this.p = params.page;

    this.contestsService
      .getContests('/contests/past', params)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: data => {
          this.contests = data.contests.map(contest => {
            const start_day = new Date(contest.start_time).getDay();
            const end_day = new Date(contest.end_time).getDay();
            contest.days = end_day - start_day;
            return contest;
          });
          this.total = data.total;
        },
        error: err => {
          this.alertService.error(err);
        },
      });
  }
}
