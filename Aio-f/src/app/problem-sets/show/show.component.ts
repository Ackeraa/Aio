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
  @Input() source: string;
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
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getProblemSets(this.problemSetsService.getProblemSetsPage());
  }

  getProblemSets(params: SearchParams): void {
    this.loading = true;
    this.p = params.page;
    params.addition = { source: this.source };
    this.problemSetsService
      .getProblemSets(params)
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
