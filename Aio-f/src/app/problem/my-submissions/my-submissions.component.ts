import { Component } from '@angular/core';
import { filter } from 'rxjs';
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
    this.problemService.problem$.pipe(filter((x) => !!x)).subscribe({
      next: (problem) => {
        const user = JSON.parse(localStorage.getItem('user'));
        this.addition = { problem_id: problem.id, user_id: user.id };
      },
    });
  }
}
