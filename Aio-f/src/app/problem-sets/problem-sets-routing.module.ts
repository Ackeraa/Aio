import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
	ProblemSetsComponent,
	CreateComponent,
	PrivateComponent,
	PublicComponent,
  GroupComponent
} from '.';

const routes: Routes = [
	{
		path: '', component: ProblemSetsComponent,
		children: [
			{ path: '', redirectTo: 'public', pathMatch: 'full' },
			{ path: 'create', component: CreateComponent },
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
export class ProblemSetsRoutingModule { }
