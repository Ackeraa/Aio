import { Component } from '@angular/core';
import { combineLatest, filter } from 'rxjs';
import { ProblemService } from '../problem.service';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-problem-my-submissions',
  templateUrl: './my-submissions.component.html',
  styleUrls: ['./my-submissions.component.scss'],
})
export class MySubmissionsComponent {
  addition: any;

  constructor(
    private authService: AuthService,
    private problemService: ProblemService
  ) {}

  ngOnInit(): void {
    combineLatest([this.problemService.problem$, this.authService.user$])
      .pipe(filter(([x, y]) => x != null && y != null))
      .subscribe(z => {
        this.addition = { problem_id: z[0].id, user_id: z[1].id };
      });
  }
}
