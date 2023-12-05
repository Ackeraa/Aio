import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs';
import { AlertService, SearchParams } from '../../shared';
import { ContestsService } from '../contests.service';

@Component({
  selector: 'app-contests-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent {
  @Input() source: string;
  loading: boolean;
  contests: any;
  total: number;
  p: number;
  user: any;

  constructor(
    private contestsService: ContestsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getContests(this.contestsService.getContestsPage());
  }

  getContests(params: SearchParams): void {
    this.loading = true;
    this.p = params.page;
    params.addition = { source: this.source };
    this.contestsService
      .getContests(params)
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
