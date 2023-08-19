import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProblemsComponent } from './problems.component';
import { CreateUpdateComponent, ShowComponent } from '.';

const routes: Routes = [
  {
    path: '',
    component: ProblemsComponent,
    children: [
      { path: '', redirectTo: 'show', pathMatch: 'full' },
      { path: 'show', component: ShowComponent },
      { path: 'create', component: CreateUpdateComponent },
      { path: 'update/:id', component: CreateUpdateComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProblemsRoutingModule {}
