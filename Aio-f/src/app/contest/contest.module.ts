import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { TranslateModule } from '@ngx-translate/core';
import { ContestRoutingModule } from './contest-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProblemSearchModule, SubmissionsModule } from '../shared';
import { ProblemsModule } from '../problems';

import {
  MySubmissionsComponent,
  ProblemsComponent,
  SubmissionsComponent,
  SubmitComponent,
  RanksComponent,
  DescriptionComponent,
} from '.';

@NgModule({
  declarations: [
    ProblemsComponent,
    SubmitComponent,
    MySubmissionsComponent,
    SubmissionsComponent,
    RanksComponent,
    DescriptionComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    NgxPaginationModule,
    FormsModule,
    CodemirrorModule,
    TranslateModule,
    ContestRoutingModule,
    ProblemSearchModule,
    SubmissionsModule,
    ProblemsModule,
  ],
  exports: [],
})
export class ContestModule {}
