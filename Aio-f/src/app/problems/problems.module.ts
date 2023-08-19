import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProblemsRoutingModule } from './problems-routing.module';
import { SearchModule, ProblemSearchModule, HoldButtonModule } from '../shared';

import {
  CreateUpdateComponent,
  UploadComponent,
  ShowComponent
} from '.';

@NgModule({
  declarations: [
    UploadComponent,
    CreateUpdateComponent,
    ShowComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    TranslateModule,
    FileUploadModule,
    ReactiveFormsModule,
    MarkdownModule.forChild(),
    ProblemsRoutingModule,
    NgxPaginationModule,
    SearchModule,
    ProblemSearchModule,
    HoldButtonModule,
  ],
  exports: [
    ShowComponent,
  ],
})
export class ProblemsModule {}
