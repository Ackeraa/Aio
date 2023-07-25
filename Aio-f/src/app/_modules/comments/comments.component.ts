import { Component, OnInit, Input } from '@angular/core';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { map, filter } from 'rxjs/operators'; 
import { AuthService } from '../../_services/auth.service';
import { CommentsService } from '../../_services';

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

	// Define the comments location.
	@Input() which: string;

	// Define the route url.
	uri: string = 'comments';

	loading: boolean;
	descriptions: any;
	comments: Array<any>;
	user: any;
	p: number;
	total: number;

	constructor(private authService: AuthService,
				private commentsService: CommentsService) {
	}

	ngOnInit(): void {
		this.descriptions = {};
		this.authService.user$
			.pipe(filter(x => x != null))
			.subscribe(user => this.user = user);
	}

	setComments(data: any): void {
		this.comments = data.comments;
		this.total = data.total;
	}

	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	getPage(page: number): void {
		this.commentsService.getPage(this.which, page)
			.subscribe(data => {
				this.comments = data.comments;
				this.total = data.total;
				this.p = page;
			});
	}

	setVisible(comment: any): void {
		//Set visibility of the children of comment.
		comment.is_visible = !comment.is_visible;
	}

	initDescription(id: number): void {
		this.descriptions[id] = "";	
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
				dislikes: { votes: 0, voters: [] }
			},
			children: []
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
				dislikes: { votes: 0, voters: [] }
			},
			children: []
		});
		this.commentsService.create(node.comment.id, this.which, this.descriptions[node.comment.id]);
	}

}
