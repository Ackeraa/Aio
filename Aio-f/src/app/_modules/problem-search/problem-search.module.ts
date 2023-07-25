import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProblemSearchComponent } from './problem-search.component';

@NgModule({
	declarations: [
		ProblemSearchComponent
	],
	imports: [
		CommonModule,
    FontAwesomeModule
	],
	exports: [
		ProblemSearchComponent
	]
})
export class ProblemSearchModule { }
