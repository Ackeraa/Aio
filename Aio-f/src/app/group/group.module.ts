import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  GroupComponent,
  HomeComponent,
  ContestsComponent,
  ProblemSetsComponent,
  MembersComponent,
  InviteComponent,
} from '.';

@NgModule({
  declarations: [
    GroupComponent,
    HomeComponent,
    ContestsComponent,
    ProblemSetsComponent,
    MembersComponent,
    InviteComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [GroupComponent],
})
export class GroupModule {}
