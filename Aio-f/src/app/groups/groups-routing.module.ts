import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsComponent } from './groups.component';
import {
	ExploreComponent,
	MyGroupsComponent,
  CreateUpdateComponent
} from '.';

const routes: Routes = [
	{
		path: '', component: GroupsComponent,
		children: [
			{ path: '', redirectTo: 'my-groups', pathMatch: 'full' },
			{ path: 'my-groups', component: MyGroupsComponent },
			{ path: 'explore', component: ExploreComponent },
      { path: 'create', component: CreateUpdateComponent },
      { path: 'update/:id', component: CreateUpdateComponent },
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GroupsRoutingModule { }
