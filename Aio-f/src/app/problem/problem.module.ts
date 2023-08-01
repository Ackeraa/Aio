import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule } from '@angular/forms';
import { ProblemRoutingModule } from './problem-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { SearchModule, CommentsModule, SubmissionsModule } from '../shared';

import {
  DescriptionComponent,
  DiscussionComponent,
  MySubmissionsComponent,
  SolutionsComponent,
  SubmissionsComponent,
  SubmitComponent,
  UploadComponent,
} from '.';

@NgModule({
  declarations: [
    DescriptionComponent,
    DiscussionComponent,
    MySubmissionsComponent,
    SolutionsComponent,
    SubmissionsComponent,
    SubmitComponent,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    CodemirrorModule,
    ProblemRoutingModule,
    NgxPaginationModule,
    SearchModule,
    CommentsModule,
    SubmissionsModule,
    MarkdownModule.forChild(),
    FontAwesomeModule,
  ],
  exports: [],
})
export class ProblemModule {
}
