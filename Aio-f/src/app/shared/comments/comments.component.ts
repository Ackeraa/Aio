import { Component, Input } from '@angular/core';
import { filter, finalize } from 'rxjs';
import { AuthService } from '../../auth';
import { AlertService, CommentsService, SearchParams } from '../';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  @Input() source: string;

  loading: boolean;
  comments: Array<any>;
  p: number;
  total: number;
  descriptions: { [key: number]: string };
  collapseStates: { [key: number]: boolean };
  visibilityStates: { [key: number]: boolean };

  constructor(
    private alertService: AlertService,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.collapseStates = {};
    this.visibilityStates = {};
    this.descriptions = {};
    this.getComments(this.commentsService.getCommentsPage());
  }

  getComments(params: SearchParams): void {
    this.loading = true;
    this.p = params.page;
    params.addition = { source: this.source };
    this.commentsService
      .getComments(params)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: data => {
          this.comments = data.comments;
          this.total = data.total;
        },
        error: err => {
          this.alertService.error(err);
        },
      });
  }

  setVisibility(id: number): void {
    this.visibilityStates[id] = !this.visibilityStates[id];
  }

  setCollapse(id: number): void {
    this.collapseStates[id] = !this.collapseStates[id];

    for (let key in this.collapseStates) {
      if (Number(key) !== id) {
        this.collapseStates[key] = false;
      }
    }
  }

  voteUp(node: any): void {
    this.commentsService
      .voteUp(node.comment.id)
      .pipe(finalize(() => (this.loading = true)))
      .subscribe({
        next: comment => {
          node.comment = comment;
        },
        error: err => {
          this.alertService.error(err);
        },
      });
  }

  voteDown(node: any): void {
    this.commentsService
      .voteDown(node.comment.id)
      .pipe(finalize(() => (this.loading = true)))
      .subscribe({
        next: comment => {
          node.comment = comment;
        },
        error: err => {
          this.alertService.error(err);
        },
      });
  }

  addComment(id: number = 0): void {
    if (!this.descriptions[id]) {
      return;
    }
    this.commentsService
      .createComment(id, this.source, this.descriptions[id])
      .pipe(finalize(() => (this.loading = true)))
      .subscribe({
        next: () => {
          this.descriptions[id] = '';
          this.visibilityStates[id] = true;
          this.collapseStates[id] = false;
          this.getComments(this.commentsService.getCommentsPage());
        },
        error: err => {
          this.alertService.error(err);
        },
      });
  }
}
