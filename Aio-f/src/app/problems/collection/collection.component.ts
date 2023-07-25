import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemsService } from '../problems.service';
import { AlertService } from 'src/app/_services';
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

  ngOnInit(): void {}

  setProblems(data: ProblemsData): void {
    this.problems = data.problems;
    this.total = data.total;
    this.p = this.problemsService.getCollectionPage();
  }

  getProblems(event: { page: number } ): void {
    const page = event.page;
    this.problemsService.getCollectionProblems(page).subscribe({
      next: (data: ProblemsData) => {
        this.problems = data.problems;
        this.total = data.total;
        this.p = page;
        this.alertService.clear();
      },
      error: err => {
        this.alertService.error(err);
      },
    });
  }

  setLoading(loading: boolean): void {
    this.loading = loading;
  }

  viewProblem(source: string, id: string): void {
    const url = source === 'aio' ? `/problem/l/${id}` : `/problem/v/${id}`;
    this.router.navigate([url]);
  }
}
