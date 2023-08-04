import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemsService } from '../problems.service';
import { AlertService, ProblemBasic, ProblemSearchParams } from '../../shared/';
import { finalize } from 'rxjs';

interface ProblemsData {
  total: number;
  problems: ProblemBasic[];
}

@Component({
  selector: 'app-problems-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent {
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

  getProblems(params: ProblemSearchParams): void {
    this.p = params.page;
    this.loading = true;
    this.problemsService
      .getPublicProblems(params)
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

  spide(source: string): void {
    this.loading = true;
    this.alertService.success('Spiding successful, please wait');
    this.problemsService
      .spideProblems(source)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data: ProblemsData) => {
          this.problems = data.problems;
          this.total = data.total;
          this.p = 1;
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
