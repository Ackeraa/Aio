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
  @Input() which: string;

  loading: boolean;
  comments: Array<any>;
  user: any;
  p: number;
  total: number;
  descriptions: { [key: number]: string };
  collapseStates: { [key: number]: boolean };
  visibilityStates: { [key: number]: boolean };

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.collapseStates = {};
    this.visibilityStates = {};
    this.descriptions = {};

    this.getComments(this.commentsService.getCommentsPage());

    this.authService.user$
      .pipe(filter(x => x != null))
      .subscribe(user => (this.user = user));
  }

  getComments(params: SearchParams): void {
    this.loading = true;
    this.p = params.page;
    params.addition = { which: this.which };
    this.commentsService
      .getComments('/comments/search', params)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: data => {
          this.comments = data.comments || [];
          console.log(this.comments);
          this.total = data.total || 0;
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

  addComment(): void {
    if (!this.descriptions[0]) {
      return;
    }
    this.commentsService
      .createComment(0, this.which, this.descriptions[0])
      .pipe(finalize(() => (this.loading = true)))
      .subscribe({
        next: comment => {
          this.descriptions[0] = '';
          this.visibilityStates[0] = true;
          this.collapseStates[0] = false;
          this.comments.unshift({
            comment: comment,
            children: [],
          });
        },
        error: err => {
          this.alertService.error(err);
        },
      });
  }

  reply(node: any): void {
    if (!this.descriptions[node.comment.id]) {
      return;
    }
    this.commentsService
      .createComment(
        node.comment.id,
        this.which,
        this.descriptions[node.comment.id]
      )
      .subscribe({
        next: comment => {
          this.descriptions[node.comment.id] = '';
          this.visibilityStates[node.comment.id] = true;
          this.collapseStates[node.comment.id] = false;
          node.children.unshift({
            comment: comment,
            children: [],
          });
        },
        error: err => {
          this.alertService.error(err);
        },
      });
  }
}
