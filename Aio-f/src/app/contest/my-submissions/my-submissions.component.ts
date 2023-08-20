import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ContestService } from '../contest.service';

@Component({
  selector: 'app-contest-my-submissions',
  templateUrl: './my-submissions.component.html',
  styleUrls: ['./my-submissions.component.scss'],
})
export class MySubmissionsComponent {
  addition: any;

  constructor(
    private contestService: ContestService
  ) {}

  ngOnInit(): void {
    this.contestService.contest$.pipe(filter((x) => !!x)).subscribe((contest) => {
      const user = JSON.parse(localStorage.getItem('user'));
      this.addition = { contest_id: contest.id, user_id: user.id };
        console.log(this.addition);
      });
  }
}
