import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProblemsComponent } from './problems.component';
import {
	BetaComponent,
	CreateComponent,
	CollectionComponent
} from '.';

const routes: Routes = [
	{
		path: '',
		component: ProblemsComponent,
		children: [
			{ path: '', redirectTo: 'collection', pathMatch: 'full' },
			{ path: 'collection', component: CollectionComponent },
			{ path: 'beta', component: BetaComponent },
			{ path: 'create', component: CreateComponent },
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
export class ProblemsRoutingModule {
}
