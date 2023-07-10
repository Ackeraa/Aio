import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
	ProblemSetsComponent,
	CreateComponent,
	PrivateComponent,
	PublicComponent
} from '.';

const routes: Routes = [
	{
		path: '', component: ProblemSetsComponent,
		children: [
			{ path: '', redirectTo: 'public' },
			{ path: 'create', component: CreateComponent },
			{ path: 'private', component: PrivateComponent },
			{ path: 'public', component: PublicComponent },
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProblemSetsRoutingModule { }
