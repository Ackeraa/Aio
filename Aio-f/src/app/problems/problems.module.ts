import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProblemsRoutingModule } from './problems-routing.module';

import { ProblemSearchModule } from '../shared';

import {
  CreateComponent,
  BetaComponent,
  UploadComponent,
  PublicComponent,
} from '.';
import { PrivateComponent } from './private/private.component';

@NgModule({
  declarations: [
    CreateComponent,
    BetaComponent,
    UploadComponent,
    PublicComponent,
    PrivateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
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
