import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsComponent } from './groups.component';
import {
  PublicComponent,
  PrivateComponent,
  CreateUpdateComponent
} from '.';

const routes: Routes = [
	{
		path: '', component: GroupsComponent,
		children: [
			{ path: '', redirectTo: 'public', pathMatch: 'full' },
			{ path: 'private', component: PrivateComponent },
			{ path: 'public', component: PublicComponent},
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
