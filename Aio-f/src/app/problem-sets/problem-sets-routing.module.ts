import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProblemSetsComponent, CreateUpdateComponent, ShowComponent } from '.';

const routes: Routes = [
  {
    path: '',
    component: ProblemSetsComponent,
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
export class ProblemSetsRoutingModule {}
