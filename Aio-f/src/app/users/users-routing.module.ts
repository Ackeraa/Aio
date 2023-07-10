import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import {
	ExploreComponent,
	MyInfoComponent
} from '.';

const routes: Routes = [
	{
		path: '', component: UsersComponent,
		children: [
			{ path: '', redirectTo: 'my-info', pathMatch: 'full' },
			{ path: 'my-info', component: MyInfoComponent },
			{ path: 'explore', component: ExploreComponent },
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UsersRoutingModule { }
