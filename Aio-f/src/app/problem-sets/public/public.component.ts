import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AlertService, SearchParams } from '../../shared';
import { ProblemSetsService } from '../problem-sets.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent {
  loading: boolean;
  problemSets: Array<any>;
  total: number;
  p: number;

  constructor(
    private problemSetsService: ProblemSetsService,
    private AlertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getProblemSets(this.problemSetsService.getProblemSetsPage());
  }

  getProblemSets(params: SearchParams): void {
    this.loading = true;
    this.p = params.page;

    this.problemSetsService
      .getProblemSets('/problem_sets/public', params)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => {
          this.problemSets = data.problem_sets;
          this.total = data.total;
        },
        error: (err) => {
          this.AlertService.error(err);
        },
      });
  }
}
