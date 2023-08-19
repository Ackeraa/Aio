import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
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
  ],
  exports: [UsersComponent],
})
export class UsersModule {}
