import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  UserComponent,
  ContestsComponent,
  FriendsComponent,
  GroupsComponent,
  HomeComponent,
  ProblemsComponent,
  SettingsComponent,
} from '.';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'contests', component: ContestsComponent },
      { path: 'friends', component: FriendsComponent },
      { path: 'groups', component: GroupsComponent },
      { path: 'problems', component: ProblemsComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
