import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProblemSetsRoutingModule } from './problem-sets-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchModule } from '../shared/search/search.module';
import {
  CreateComponent,
  PrivateComponent,
  PublicComponent,
  GroupComponent,
} from '.';

@NgModule({
  declarations: [
    CreateComponent,
    PrivateComponent,
    PublicComponent,
    GroupComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ProblemSetsRoutingModule,
    FormsModule,
    SearchModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  exports: [],
})
export class ProblemSetsModule {}
