import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemsService } from '../problems.service';
import { AlertService, ProblemSearchParams } from '../../_services';
import { ProblemBasic } from '../../_models/';

interface ProblemsData {
  total: number;
  problems: ProblemBasic[];
}

@Component({
  selector: 'app-problems-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent {
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
    this.getProblems({ page: this.problemsService.getCollectionPage() });
  }

  getProblems(params: ProblemSearchParams): void {
    this.loading = true;
    this.problemsService.getCollectionProblems(params).subscribe({
      next: (data: ProblemsData) => {
        this.problems = data.problems;
        this.total = data.total;
        this.p = params.page;
        this.alertService.clear();
        this.loading = false;
      },
      error: err => {
        this.alertService.error(err);
        this.loading = false;
      },
    });
  }

  viewProblem(source: string, id: string): void {
    const url = source === 'aio' ? `/problem/l/${id}` : `/problem/v/${id}`;
    this.router.navigate([url]);
  }
}
