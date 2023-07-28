import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth';
import { HomeComponent } from './home';
import { ContestsComponent } from './contests';
import { ContestComponent } from './contest';
import { SubmissionsComponent } from './submissions';
import { DiscussionComponent } from './discussion';
import { UsersComponent } from './users';
import { WikiComponent } from './wiki';
import { ProblemSetComponent } from './problem-set';
import { GroupComponent } from './group';
import { UserComponent } from './user';
import { AuthGuard } from './helpers';

const routes: Routes = [
  //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth',
    data: { preload: true },
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  { path: 'home', component: HomeComponent },
  {
    path: 'contests',
    data: { preload: true },
    loadChildren: () =>
      import('./contests/contests.module').then(m => m.ContestsModule),
  },
  {
    path: 'contest/:id',
    data: { preload: true },
    loadChildren: () =>
      import('./contest/contest.module').then(m => m.ContestModule),
  },
  {
    path: 'problems',
    data: { preload: true },
    loadChildren: () =>
      import('./problems/problems.module').then(m => m.ProblemsModule),
  },
  {
    path: 'problem/:source/:id',
    data: { preload: true },
    loadChildren: () =>
      import('./problem/problem.module').then(m => m.ProblemModule),
  },
  {
    path: 'groups',
    data: { preload: true },
    loadChildren: () =>
      import('./groups/groups.module').then(m => m.GroupsModule),
  },
  {
    path: 'group/:id',
    component: GroupComponent,
  },
  {
    path: 'problem-sets',
    data: { preload: true },
    loadChildren: () =>
      import('./problem-sets/problem-sets.module').then(
        m => m.ProblemSetsModule
      ),
  },
  {
    path: 'problem-set/:id',
    component: ProblemSetComponent,
  },
  { path: 'submissions', component: SubmissionsComponent },
  { path: 'discussion', component: DiscussionComponent },
  {
    path: 'users',
    data: { preload: true },
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  },
  {
    path: 'user/:id',
    component: UserComponent,
  },
  //{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
