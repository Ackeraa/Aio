import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ContestsRoutingModule } from './contests-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchModule, HoldButtonModule } from '../shared';
import {
  RecentComponent,
  PastComponent,
  PublicComponent,
  GroupComponent,
  PrivateComponent,
  CreateUpdateComponent,
  ShowComponent,
} from '.';

@NgModule({
  declarations: [
    RecentComponent,
    PastComponent,
    PublicComponent,
    GroupComponent,
    PrivateComponent,
    CreateUpdateComponent,
    ShowComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    TranslateModule,
    HoldButtonModule,
    ContestsRoutingModule,
    FormsModule,
    NgxPaginationModule,
    SearchModule,
    ReactiveFormsModule,
  ],
  exports: [],
})
export class ContestsModule {}
