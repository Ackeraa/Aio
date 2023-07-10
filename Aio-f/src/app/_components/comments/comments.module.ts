import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { MarkdownModule} from 'ngx-markdown';
import { SearchModule } from '../search/search.module';
import { CommentsComponent } from './comments.component';

@NgModule({
	declarations: [
		CommentsComponent
	],
	imports: [
		CommonModule,
		MarkdownModule,
		NgxPaginationModule,
		FormsModule,
		SearchModule
	],
	exports: [
		CommentsComponent
	]
})
export class CommentsModule { }
