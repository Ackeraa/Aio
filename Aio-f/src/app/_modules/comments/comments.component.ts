import { Component, Input } from '@angular/core';
import { filter, finalize } from 'rxjs';
import {
  AuthService,
  AlertService,
  CommentsService,
  SearchParams,
} from 'src/app/_services';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  @Input() which: string;

  url: string = '/comments';

  loading: boolean;
  descriptions: any;
  comments: Array<any> = new Array<any>();
  user: any;
  p: number;
  total: number;
  collapseStates: Array<boolean>;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.getComments(this.commentsService.getCommentsPage());

    this.descriptions = {};
    this.authService.user$
      .pipe(filter((x) => x != null))
      .subscribe((user) => (this.user = user));
  }

  getComments(params: SearchParams): void {
    this.loading = true;
    this.p = params.page;
    params.addition = { which: this.which };
    this.commentsService
      .getComments('/comments/search', params)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => {
          console.log("FXXXX", data);
          this.comments = data.comments || [];
          this.total = data.total || 0;

          this.collapseStates = new Array(this.comments.length);
          this.collapseStates.fill(true);
          console.log("FXXXX", this.collapseStates);
        },
        error: (err) => {
          this.alertService.error(err);
        },
      });
  }

  toggleCollapse(index: number): void {
    this.collapseStates[index] = !this.collapseStates[index];
  }

  setVisible(comment: any): void {
    //Set visibility of the children of comment.
    comment.is_visible = !comment.is_visible;
  }

  initDescription(id: number): void {
    this.descriptions[id] = '';
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
    this.comments.unshift({
      comment: {
        creator: this.user.user_name,
        description: this.descriptions[0],
        likes: { votes: 0, voters: [] },
        dislikes: { votes: 0, voters: [] },
      },
      children: [],
    });
    this.commentsService.create(0, this.which, this.descriptions[0]);
  }

  reply(node: any): void {
    node.comment.is_visible = true;
    node.children.unshift({
      comment: {
        creator: this.user.user_name,
        description: this.descriptions[node.comment.id],
        likes: { votes: 0, voters: [] },
        dislikes: { votes: 0, voters: [] },
      },
      children: [],
    });
    this.commentsService.create(
      node.comment.id,
      this.which,
      this.descriptions[node.comment.id]
    );
  }
}
