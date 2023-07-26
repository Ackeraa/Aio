import { Component } from '@angular/core';
import { faLock, faClock, faHome } from '@fortawesome/free-solid-svg-icons';

import { ContestsService } from '../contests.service';

@Component({
  selector: 'app-contests-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss'],
})
export class RecentComponent {
  url: string = '/contests/recent';
  addition: { [key: string]: string };
  loading: boolean;
  contests: any;
  p: number;
  total: number;

  lock = faHome;
  clock = faClock;

  constructor(private contestsService: ContestsService) {}

  ngOnInit(): void {}

  setContests(data: any): void {
    this.contests = data.contests;
    this.contests.map(contest => {
      let start_day = new Date(contest.start_time).getDay();
      let end_day = new Date(contest.end_time).getDay();
      contest.days = end_day - start_day;
      return contest;
    });
    this.total = data.total;
  }

  setLoading(loading: boolean): void {
    this.loading = loading;
  }

  getContests(page: number): void {
    this.contestsService.getContests(page).subscribe(data => {
      this.contests = data.contests;
      console.log(data.contests);
      this.total = data.total;
      this.p = page;
    });
  }
}
