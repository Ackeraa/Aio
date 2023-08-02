import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
	ContestsComponent,
	RecentComponent,
	PastComponent,
  PublicComponent,
  GroupComponent,
  PrivateComponent,
  CreateUpdateComponent,
} from '.';

const routes: Routes = [
  // Path: /contests
	{
		path: '', component: ContestsComponent,
		children: [
			{ path: '', redirectTo: 'public', pathMatch: 'full' },
			{ path: 'recent', component: RecentComponent },
			{ path: 'past', component: PastComponent },
      { path: 'public', component: PublicComponent },
      { path: 'group', component: GroupComponent },
      { path: 'private', component: PrivateComponent },
      { path: 'create', component: CreateUpdateComponent },
      { path: 'edit/:id', component: CreateUpdateComponent },
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ContestsRoutingModule { }
