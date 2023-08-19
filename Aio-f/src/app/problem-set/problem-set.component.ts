import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { AlertService, ProblemSearchParams } from '../shared';
import { ProblemSetService } from './problem-set.service';

@Component({
  selector: 'app-problem-set',
  templateUrl: './problem-set.component.html',
  styleUrls: ['./problem-set.component.scss'],
})
export class ProblemSetComponent {
  loading: boolean;
  allProblems: any;
  problems: Array<any>;
  p: number;
  total: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private problemSetService: ProblemSetService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getAllProblems(this.problemSetService.getAllProblemsPage());
    let id = this.route.snapshot.paramMap.get('id');
    this.problems = [];
    this.problemSetService.getProblems(id).subscribe({
      next: (data) => {
        this.problems = data.problems;
      },
    });
  }

  getAllProblems(params: ProblemSearchParams): void {
    this.p = params.page;
    this.loading = true;
    this.problemSetService
      .getAllProblems(params)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => {
          this.allProblems = data.problems;
          this.total = data.total;
        },
        error: (err) => {
          this.alertService.error(err);
        },
      });
  }

  viewProblem(source: string, id: string): void {
    const url = source === 'aio' ? `/problems/l/${id}` : `/problems/v/${id}`;

    this.router.navigate([url]);
  }

  isAdded(id: string): boolean {
    // FIXME: this is a hack, fix it
    if (!this.problems) {
      return false;
    }
    return this.problems.filter((x) => x.id === id).length > 0;
  }

  addProblem(id: number): void {
    this.problemSetService
      .addProblem(id)
      .subscribe((problems) => (this.problems = problems));
  }

  deleteProblem(id: string): void {
    this.problemSetService
      .deleteProblem(id)
      .subscribe((problems) => (this.problems = problems));
  }
}
