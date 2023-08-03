import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { AlertService, SearchParams } from '../../shared';
import { ContestsService } from '../contests.service';

@Component({
  selector: 'app-contests-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent {
  which: string;
  loading: boolean;
  contests: any;
  total: number;
  p: number;

  constructor(
    private route: ActivatedRoute,
    private contestsService: ContestsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe({
      next: url => {
        this.which = url[0].path;
        console.log(this.which);
      },
    });

    this.getContests(this.contestsService.getContestsPage());
  }

  getContests(params: SearchParams): void {
    this.loading = true;
    this.p = params.page;
    params.addition = { which: this.which };
    this.contestsService
      .getContests('/contests/search', params)
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
