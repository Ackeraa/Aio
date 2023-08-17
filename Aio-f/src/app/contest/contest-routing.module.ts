import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContestComponent } from './contest.component';
import {
  MySubmissionsComponent,
  ProblemsComponent,
  RanksComponent,
  SubmissionsComponent,
  SubmitComponent,
  DescriptionComponent,
} from '.';

const routes: Routes = [
  {
    path: '',
    component: ContestComponent,
    children: [
      { path: '', redirectTo: 'description', pathMatch: 'full' },
      { path: 'description', component: DescriptionComponent },
      { path: 'my-submissions', component: MySubmissionsComponent },
      { path: 'problems', component: ProblemsComponent },
      { path: 'ranks', component: RanksComponent },
      { path: 'submissions', component: SubmissionsComponent },
      { path: 'submit', component: SubmitComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContestRoutingModule {}
