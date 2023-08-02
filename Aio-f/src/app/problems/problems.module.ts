import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProblemsRoutingModule } from './problems-routing.module';
import { ProblemSearchModule } from '../shared';

import {
  BetaComponent,
  UploadComponent,
  PublicComponent,
  PrivateComponent,
  CreateUpdateComponent,
} from '.';

@NgModule({
  declarations: [
    BetaComponent,
    UploadComponent,
    PublicComponent,
    PrivateComponent,
    CreateUpdateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    TranslateModule,
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
