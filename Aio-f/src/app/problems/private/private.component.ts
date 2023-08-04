import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemsService } from '../problems.service';
import { AlertService, ProblemBasic, SearchParams } from '../../shared/';
import { finalize } from 'rxjs';

interface ProblemsData {
  total: number;
  problems: ProblemBasic[];
}

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent {
  loading: boolean;
  problems: ProblemBasic[];
  p: number;
  total: number;

  constructor(
    private router: Router,
    private problemsService: ProblemsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getProblems(this.problemsService.getPublicPage());
  }

  getProblems(params: SearchParams): void {
    params.addition = { source: 'aio' };
    this.p = params.page;
    this.loading = true;

    this.problemsService
      .getPrivateProblems(params)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data: ProblemsData) => {
          this.problems = data.problems;
          this.total = data.total;
          this.alertService.clear();
        },
        error: err => {
          this.alertService.error(err);
        },
      });
  }

  viewProblem(source: string, id: string): void {
    const url = source === 'aio' ? `/problem/l/${id}` : `/problem/v/${id}`;
    this.router.navigate([url]);
  }
}
