import { Component } from '@angular/core';
import { combineLatest, filter } from 'rxjs';
import { ProblemService } from '../problem.service';
import { AuthService } from '../../_services';

@Component({
  selector: 'app-problem-my-submissions',
  templateUrl: './my-submissions.component.html',
  styleUrls: ['./my-submissions.component.scss'],
})
export class MySubmissionsComponent {
  addition: {} | undefined = undefined;

  constructor(
    private authService: AuthService,
    private problemService: ProblemService
  ) {}

  ngOnInit(): void {
    console.log('MySubmissionsComponent');
    combineLatest(this.problemService.problem$, this.authService.user$)
      .pipe(filter(([x, y]) => x != null && y != null))
      .subscribe((z) => {
        this.addition = { problem_id: z[0].id, user_id: z[1].user_id };
        console.log("MySubmissionsComponent addition", this.addition);
      });
  }
}
