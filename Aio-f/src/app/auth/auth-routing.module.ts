import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AuthComponent,
  ForgotComponent,
  LoginComponent,
  RegisterComponent,
  ResetComponent,
  resetGuard,
} from '.';

const routes: Routes = [
  // Path: /auth
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'forgot', component: ForgotComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'reset', component: ResetComponent, canActivate: [resetGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
