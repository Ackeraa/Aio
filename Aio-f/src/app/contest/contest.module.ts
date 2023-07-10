import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { ContestRoutingModule } from './contest-routing.module';
import { ProblemSearchModule } from '../_components';
import { SubmissionsModule } from '../_components';

import {
	MySubmissionsComponent,
	ProblemsComponent, 
	SubmissionsComponent,
	SubmitComponent, 
	RanksComponent
} from '.';


@NgModule({
	declarations: [
		ProblemsComponent,
		SubmitComponent,
		MySubmissionsComponent,
		SubmissionsComponent,
		RanksComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		NgxPaginationModule,
		FormsModule,
		CodemirrorModule,
		ContestRoutingModule,
		ProblemSearchModule,
		SubmissionsModule
	],
	exports: [
	]
})
export class ContestModule { }
