import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchModule } from '../search/search.module';
import { SubmissionsComponent } from './submissions.component';

@NgModule({
  declarations: [SubmissionsComponent],
  imports: [CommonModule, FormsModule, NgxPaginationModule, SearchModule],
  exports: [SubmissionsComponent],
})
export class SubmissionsModule {}
