import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchModule, HoldButtonModule } from '../shared';
import { MessagesComponent } from './messages.component';



@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FontAwesomeModule,
    NgbModule,
    SearchModule,
    HoldButtonModule
  ]
})
export class MessagesModule { }
