import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ContestsComponent,
  CreateUpdateComponent,
  PublicComponent,
  GroupComponent,
  PrivateComponent,
} from '.';

const routes: Routes = [
  // Path: /contests
  {
    path: '',
    component: ContestsComponent,
    children: [
      { path: '', redirectTo: 'public', pathMatch: 'full' },
      { path: 'public', component: PublicComponent },
      { path: 'group', component: GroupComponent },
      { path: 'private', component: PrivateComponent },
      { path: 'create', component: CreateUpdateComponent },
      { path: 'edit/:id', component: CreateUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContestsRoutingModule {}
