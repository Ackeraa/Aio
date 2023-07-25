import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProblemsRoutingModule } from './problems-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProblemSearchModule } from '../_modules';

import {
  CreateComponent,
  BetaComponent,
  UploadComponent,
  CollectionComponent,
} from '.';

@NgModule({
  declarations: [
    CreateComponent,
    BetaComponent,
    UploadComponent,
    CollectionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
    MarkdownModule.forChild(),
    ProblemsRoutingModule,
    NgxPaginationModule,
    ProblemSearchModule,
  ],
  exports: [],
})
export class ProblemsModule {}
