import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { MarkdownModule } from 'ngx-markdown';
import { SearchModule } from '../search/search.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { CommentsComponent } from './comments.component';

@NgModule({
  declarations: [CommentsComponent],
  imports: [
    CommonModule,
    MarkdownModule,
    TranslateModule,
    FontAwesomeModule,
    NgxPaginationModule,
    NgbModule,
    FormsModule,
    SearchModule,
  ],
  exports: [CommentsComponent],
})
export class CommentsModule {}
