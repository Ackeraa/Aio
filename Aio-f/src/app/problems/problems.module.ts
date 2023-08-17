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
  UploadComponent,
  PublicComponent,
  PrivateComponent,
  CreateUpdateComponent,
} from '.';

@NgModule({
  declarations: [
    UploadComponent,
    PublicComponent,
    PrivateComponent,
    CreateUpdateComponent,
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
  exports: [],
})
export class ProblemsModule {}
