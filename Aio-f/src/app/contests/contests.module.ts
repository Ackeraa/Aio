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
  CreateUpdateComponent,
  ShowComponent,
  PublicComponent,
  GroupComponent,
  PrivateComponent,
} from '.';

@NgModule({
  declarations: [
    CreateUpdateComponent,
    ShowComponent,
    PublicComponent,
    PrivateComponent,
    GroupComponent,
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
  exports: [ShowComponent],
})
export class ContestsModule {}
