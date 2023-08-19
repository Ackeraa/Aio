import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupModule } from '../group/group.module';
import { SearchModule, HoldButtonModule } from '../shared';
import {
  ExploreComponent,
  MyGroupsComponent,
  CreateUpdateComponent,
  ShowComponent,
} from '.';

@NgModule({
  declarations: [
    ExploreComponent,
    MyGroupsComponent,
    CreateUpdateComponent,
    ShowComponent,
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    SearchModule,
    GroupModule,
    HoldButtonModule,
    NgxPaginationModule,
  ],
  exports: [ShowComponent],
})
export class GroupsModule {}
