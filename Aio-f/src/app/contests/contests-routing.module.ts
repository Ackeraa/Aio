import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
	ContestsComponent,
	CreateComponent,
	RecentComponent,
	PastComponent,
  PublicComponent,
  GroupComponent,
  PrivateComponent,
} from '.';

const routes: Routes = [
  // Path: /contests
	{
		path: '', component: ContestsComponent,
		children: [
			{ path: '', redirectTo: 'public', pathMatch: 'full' },
			{ path: 'create', component: CreateComponent },
			{ path: 'recent', component: RecentComponent },
			{ path: 'past', component: PastComponent },
      { path: 'public', component: PublicComponent },
      { path: 'group', component: GroupComponent },
      { path: 'private', component: PrivateComponent },
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ContestsRoutingModule { }
