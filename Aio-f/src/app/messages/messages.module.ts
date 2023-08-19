import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchModule } from '../shared';
import { MessagesComponent } from './messages.component';



@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FontAwesomeModule,
    SearchModule
  ]
})
export class MessagesModule { }
