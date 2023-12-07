import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchModule, HoldButtonModule } from '../shared';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    FormsModule,
    SearchModule,
    NgxPaginationModule,
    NgbModule,
    HoldButtonModule,
    FontAwesomeModule,
  ],
  exports: [UsersComponent],
})
export class UsersModule {}
