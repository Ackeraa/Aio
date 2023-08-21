import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContestsModule } from '../contests';
import { ProblemSetsModule } from '../problem-sets';
import { UsersModule } from '../users';

import {
  GroupComponent,
  HomeComponent,
  ContestsComponent,
  ProblemSetsComponent,
  MembersComponent,
  InviteComponent,
  SettingsComponent,
} from '.';

@NgModule({
  declarations: [
    GroupComponent,
    HomeComponent,
    ContestsComponent,
    ProblemSetsComponent,
    MembersComponent,
    InviteComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    ContestsModule,
    ProblemSetsModule,
    UsersModule,
  ],
  exports: [GroupComponent],
})
export class GroupModule {}
