import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemSearchComponent } from './problem-search.component';

@NgModule({
	declarations: [
		ProblemSearchComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		ProblemSearchComponent
	]
})
export class ProblemSearchModule { }
