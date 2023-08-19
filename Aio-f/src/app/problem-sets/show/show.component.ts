import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AlertService, SearchParams } from '../../shared';
import { ProblemSetsService } from '../problem-sets.service';

@Component({
  selector: 'app-problem-sets-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent {
  @Input() which: string;
  loading: boolean;
  problemSets: Array<any>;
  total: number;
  p: number;
  user: any;

  constructor(
    private problemSetsService: ProblemSetsService,
    private AlertService: AlertService
  ) {}

  ngOnInit(): void {
    this.problemSetsService.getUser().subscribe({
      next: user => (this.user = user),
    });

    this.getProblemSets(this.problemSetsService.getProblemSetsPage());
  }

  getProblemSets(params: SearchParams): void {
    this.loading = true;
    this.p = params.page;
    params.addition = { which: this.which };
    this.problemSetsService
      .getProblemSets('/problem_sets/search', params)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: data => {
          this.problemSets = data.problem_sets;
          this.total = data.total;
        },
        error: err => {
          this.AlertService.error(err);
        },
      });
  }

  shareProblemSet(id: number): void {}

  deleteProblemSet(id: number): void {}
}
