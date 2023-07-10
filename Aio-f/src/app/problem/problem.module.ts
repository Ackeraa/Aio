import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule } from '@angular/forms';
import { ProblemRoutingModule } from './problem-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchModule } from '../_components';
import { CommentsModule } from '../_components';
import { SubmissionsModule } from '../_components';

import {
	DescriptionComponent,
	DiscussionComponent,
	MySubmissionsComponent,
	SolutionsComponent,
	SubmissionsComponent,
	SubmitComponent
} from '.';

@NgModule({
	declarations: [
		DescriptionComponent,
		DiscussionComponent,
		MySubmissionsComponent,
		SolutionsComponent,
		SubmissionsComponent,
		SubmitComponent
	],
	imports: [
		CommonModule,
        HttpClientModule,
		FormsModule,
		CodemirrorModule,
		ProblemRoutingModule,
		NgxPaginationModule,
		SearchModule,
		CommentsModule,
		SubmissionsModule,
		MarkdownModule.forChild(),
	],
	exports: [
	]
})
export class ProblemModule { }
