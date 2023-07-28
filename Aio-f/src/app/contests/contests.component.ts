import { Component } from '@angular/core';
import { AuthService } from '../auth';
import { SearchService } from '../shared';

@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.scss'],
})
export class ContestsComponent {
  contests: any;

  constructor(
    private authService: AuthService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    // this.searchService.get({}, '/contests').subscribe({
    //   next: data => {
    //     console.log('FUCKK', data);
    //     this.contests = data;
    //   },
    // });
  }
}
