import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { MarkdownModule } from 'ngx-markdown';
import { SearchModule } from '../search/search.module';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';

import { CommentsComponent } from './comments.component';
import { CollapseDirective } from './collapse.directive';

@NgModule({
  declarations: [CommentsComponent, CollapseDirective],
  imports: [
    CommonModule,
    MarkdownModule,
    FontAwesomeModule,
    NgxPaginationModule,
    NgbModule,
    FormsModule,
    SearchModule,
  ],
  exports: [CommentsComponent],
})
export class CommentsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faThumbsUp, faThumbsDown, faCommentDots);
  }
}
