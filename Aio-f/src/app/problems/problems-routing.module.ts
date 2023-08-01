import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProblemsComponent } from './problems.component';
import {
  BetaComponent,
  CreateComponent,
  PublicComponent,
  PrivateComponent,
} from '.';

const routes: Routes = [
  {
    path: '',
    component: ProblemsComponent,
    children: [
      { path: '', redirectTo: 'public', pathMatch: 'full' },
      { path: 'public', component: PublicComponent },
      { path: 'beta', component: BetaComponent },
      { path: 'private', component: PrivateComponent },
      { path: 'create', component: CreateComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProblemsRoutingModule {}
