import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersRoutingModule } from './users-routing.module';
import { SearchModule } from '../_modules/search/search.module';
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
  ],
  exports: [
    MyInfoComponent,
    ExploreComponent,
    //UsersComponent,
  ],
})
export class UsersModule {}
