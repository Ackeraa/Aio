import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersRoutingModule } from './users-routing.module';
import { SearchModule, HoldButtonModule } from '../shared';
import { UserModule } from '../user/user.module';

import { MyInfoComponent, ExploreComponent } from '.';

@NgModule({
  declarations: [MyInfoComponent, ExploreComponent],
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    SearchModule,
    UserModule,
    NgxPaginationModule,
    NgbModule,
    HoldButtonModule,
  ],
  exports: [
    MyInfoComponent,
    ExploreComponent,
    //UsersComponent,
  ],
})
export class UsersModule {}
