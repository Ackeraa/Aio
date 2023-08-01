import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContestService } from '../contest.service';
import { AlertService, ProblemSearchParams } from '../../shared';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-contest-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.scss'],
})
export class ProblemsComponent {
  loading: boolean;
  allProblems: any;
  problems: Array<any>;
  p: number;
  total: number;

  constructor(
    private router: Router,
    private contestService: ContestService,
    private alertService: AlertService
  ) {}

  //FIXME: loading not set properly
  ngOnInit(): void {
    this.getAllProblems(this.contestService.getAllProblemsPage());
    this.problems = [];
    this.contestService.problems$.subscribe(
      problems => (this.problems = problems)
    );
  }

  getAllProblems(params: ProblemSearchParams): void {
    this.p = params.page;
    this.loading = true;
    this.contestService
      .getAllProblems(params)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: data => {
          this.allProblems = data.problems;
          this.total = data.total;
        },
        error: err => {
          this.alertService.error(err);
        },
      });
  }

  spideAllProblems(source: string): void {
    this.loading = true;
    this.contestService
      .spideAllProblems(source)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: data => {
          this.allProblems = data.problems;
          this.total = data.total;
          this.p = 1;
        },
        error: err => {
          this.alertService.error(err);
        },
      });
  }

  viewProblem(source: string, id: string): void {
    const url = source === 'aio' ? `/problems/l/${id}` : `/problems/v/${id}`;

    this.router.navigate([url]);
  }

  isAdded(id: string): boolean {
    // FIXME: this.problems is not set properly
    if (!this.problems) {
      return false;
    }
    return this.problems.filter(x => x.id === id).length > 0;
  }

  addProblem(id: string): void {
    this.contestService.addProblem(id);
  }

  deleteProblem(id: string): void {
    this.contestService.deleteProblem(id);
  }
}
