import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProblemSetsRoutingModule } from './problem-sets-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchModule, HoldButtonModule } from '../shared';
import {
  CreateUpdateComponent,
  ShowComponent,
  PublicComponent,
  GroupComponent,
  PrivateComponent,
} from '.';

@NgModule({
  declarations: [
    CreateUpdateComponent,
    ShowComponent,
    PublicComponent,
    GroupComponent,
    PrivateComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    ProblemSetsRoutingModule,
    FormsModule,
    SearchModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HoldButtonModule,
  ],
  exports: [ShowComponent],
})
export class ProblemSetsModule {}
