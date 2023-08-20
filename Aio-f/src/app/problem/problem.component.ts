import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProblemService } from './problem.service';
import { AuthService } from '../auth';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss'],
})
export class ProblemComponent {
  source: string;
  user: any;
  constructor(
    private route: ActivatedRoute,
    private problemService: ProblemService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.source = this.route.snapshot.paramMap.get('source');
    let id = this.route.snapshot.paramMap.get('id');
    this.problemService.getProblem(this.source, id);
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
