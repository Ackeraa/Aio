import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
	ContestsComponent,
	CreateComponent,
	RecentComponent,
	PastComponent
} from '.';

const routes: Routes = [
  // Path: /contests
	{
		path: '', component: ContestsComponent,
		children: [
			{ path: '', redirectTo: 'recent', pathMatch: 'full' },
			{ path: 'create', component: CreateComponent },
			{ path: 'recent', component: RecentComponent },
			{ path: 'past', component: PastComponent },
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ContestsRoutingModule { }
