import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProblemSetsComponent, CreateUpdateComponent, PublicComponent, GroupComponent, PrivateComponent } from '.';

const routes: Routes = [
  {
    path: '',
    component: ProblemSetsComponent,
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
export class ProblemSetsRoutingModule {}
