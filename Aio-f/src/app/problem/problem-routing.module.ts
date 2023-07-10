import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProblemComponent } from './problem.component';
import {
	DescriptionComponent,
	DiscussionComponent,
	MySubmissionsComponent, 
	SolutionsComponent, 
	SubmissionsComponent, 
	SubmitComponent
} from '.';

const routes: Routes = [
	{
		path: '', component: ProblemComponent,
		children: [
			{ path: '', redirectTo: 'description', pathMatch: 'full' },
			{ path: 'description', component: DescriptionComponent },
			{ path: 'discussion', component: DiscussionComponent }, 
			{ path: 'my-submissions', component: MySubmissionsComponent }, 
			{ path: 'solutions', component: SolutionsComponent },
			{ path: 'submissions', component: SubmissionsComponent }, 
			{ path: 'submit', component: SubmitComponent }
		]
	},
];

@NgModule({
	declarations: [],
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class ProblemRoutingModule {
}
