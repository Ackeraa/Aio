import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { ContestRoutingModule } from './contest-routing.module';
import { ProblemSearchModule, SubmissionsModule } from '../shared';
import {
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';

import {
  MySubmissionsComponent,
  ProblemsComponent,
  SubmissionsComponent,
  SubmitComponent,
  RanksComponent,
} from '.';

@NgModule({
  declarations: [
    ProblemsComponent,
    SubmitComponent,
    MySubmissionsComponent,
    SubmissionsComponent,
    RanksComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    NgxPaginationModule,
    FormsModule,
    CodemirrorModule,
    ContestRoutingModule,
    ProblemSearchModule,
    SubmissionsModule,
  ],
  exports: [],
})
export class ContestModule {
}
