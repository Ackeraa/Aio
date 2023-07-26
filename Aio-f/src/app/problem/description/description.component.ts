import { Component } from '@angular/core';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { ProblemService } from '../problem.service';

@Component({
  selector: 'app-problem-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent {
  problem: any;

  constructor(private problemService: ProblemService) {}

  ngOnInit(): void {
    this.problemService.problem$.subscribe(problem => {
      this.problem = problem;
    });
  }

  reSpideProblem(): void {
    this.problemService
      .reSpideProblem()
      .subscribe(problem => (this.problem = problem));
  }

  ngOnDestroy(): void {}
}
