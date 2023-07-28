import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faSpider,
} from '@fortawesome/free-solid-svg-icons';

import { ProblemSearchComponent } from './problem-search.component';

@NgModule({
  declarations: [ProblemSearchComponent],
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  exports: [ProblemSearchComponent],
})
export class ProblemSearchModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faSpider);
  }
}
