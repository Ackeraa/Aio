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

  ngOnInit(): void {
    this.getProblems({});
  }

  getProblems(event: any): void {
    this.setLoading(true);
    this.problemsService.getCollectionProblems(event).subscribe({
      next: (data: ProblemsData) => {
        this.problems = data.problems;
        this.total = data.total;
        this.p = event.page || this.problemsService.getCollectionPage();
        this.alertService.clear();
        this.setLoading(false);
      },
      error: err => {
        this.alertService.error(err);
        this.setLoading(false);
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
