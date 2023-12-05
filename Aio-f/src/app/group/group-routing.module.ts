import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  GroupComponent,
  ContestsComponent,
  HomeComponent,
  InviteComponent,
  MembersComponent,
  ProblemSetsComponent,
  SettingsComponent,
} from '.';

const routes: Routes = [
  {
    path: '',
    component: GroupComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'contests', component: ContestsComponent },
      { path: 'problem-sets', component: ProblemSetsComponent },
      { path: 'invite', component: InviteComponent },
      { path: 'members', component: MembersComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {}
