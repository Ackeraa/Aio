import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ContestsComponent,
  CreateUpdateComponent,
  ShowComponent,
} from '.';

const routes: Routes = [
  // Path: /contests
  {
    path: '',
    component: ContestsComponent,
    children: [
      { path: '', redirectTo: 'public', pathMatch: 'full' },
      { path: 'public', component: ShowComponent },
      { path: 'group', component: ShowComponent },
      { path: 'private', component: ShowComponent },
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
