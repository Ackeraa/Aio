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
          this.total = data.total || 0;
          console.log(this.comments);
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

  voteUp(comment: any): void {
    if (comment.likes.voters.indexOf(this.user.user_id) == -1) {
      comment.likes.votes++;
      comment.likes.voters.push(this.user.user_id);
      let index = comment.dislikes.voters.indexOf(this.user.user_id);
      if (index != -1) {
        comment.dislikes.votes--;
        comment.dislikes.voters.splice(index, 1);
      }
    }
    this.commentsService.voteUp(comment.id);
  }

  voteDown(comment: any): void {
    if (comment.dislikes.voters.indexOf(this.user.user_id) == -1) {
      comment.dislikes.votes++;
      comment.dislikes.voters.push(this.user.user_id);
      let index = comment.likes.voters.indexOf(this.user.user_id);
      if (index != -1) {
        comment.likes.votes--;
        comment.likes.voters.splice(index, 1);
      }
    }
    this.commentsService.voteDown(comment.id);
  }

  addComment(): void {
    if (!this.descriptions[0]) {
      return;
    }
    this.commentsService
      .create(0, this.which, this.descriptions[0])
      .pipe(finalize(() => (this.loading = true)))
      .subscribe({
        next: comment => {
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
      .create(node.comment.id, this.which, this.descriptions[node.comment.id])
      .subscribe({
        next: comment => {
          console.log('dddddd', comment);
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
