import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProblemsComponent } from './problems.component';
import { PublicComponent, PrivateComponent, CreateUpdateComponent } from '.';

const routes: Routes = [
  {
    path: '',
    component: ProblemsComponent,
    children: [
      { path: '', redirectTo: 'public', pathMatch: 'full' },
      { path: 'public', component: PublicComponent },
      { path: 'private', component: PrivateComponent },
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
