import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProblemSetsRoutingModule } from './problem-sets-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchModule } from '../_components/search/search.module';
import {
	ProblemSetsComponent,
	CreateComponent,
	PrivateComponent,
	PublicComponent
} from '.';

@NgModule({
	declarations: [
		CreateComponent,
		PrivateComponent,
		PublicComponent
	],
	imports: [
		CommonModule,
		ProblemSetsRoutingModule,
		FormsModule,
		SearchModule,
		ReactiveFormsModule,
		NgxPaginationModule
	],
	exports: [
	]
})
export class ProblemSetsModule { }
