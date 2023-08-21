import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemsService } from '../problems.service';
import { AlertService, ProblemBasic, ProblemSearchParams } from '../../shared/';
import { finalize } from 'rxjs';

interface ProblemsData {
  total: number;
  problems: ProblemBasic[];
}

@Component({
  selector: 'app-problems-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent {
  @Input() which = 'problems';
  @Output() addToEvent = new EventEmitter<any>();

  loading: boolean;
  problems: ProblemBasic[];
  p: number;
  total: number;
  user: any;

  constructor(
    private router: Router,
    private problemsService: ProblemsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getProblems(this.problemsService.getPublicPage());
  }

  getProblems(params: ProblemSearchParams): void {
    this.p = params.page;
    this.problemsService
      .getPublicProblems(params)
      .subscribe({
        next: (data: ProblemsData) => {
          this.problems = data.problems;
          this.total = data.total;
          this.alertService.clear();
        },
        error: (err) => {
          this.alertService.error(`${err.status} ${err.statusText}`);
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
        error: (err) => {
          this.alertService.error(err);
        },
      });
  }

  // Add problem to problem set or contest, emit event to parent component
  addTo(id: number): void {
    this.addToEvent.emit(id);
  }

}
