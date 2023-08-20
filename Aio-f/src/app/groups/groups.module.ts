import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupModule } from '../group/group.module';
import { SearchModule, HoldButtonModule } from '../shared';
import {
  CreateUpdateComponent,
  ShowComponent,
  PublicComponent,
  PrivateComponent,
} from '.';

@NgModule({
  declarations: [
    CreateUpdateComponent,
    ShowComponent,
    PrivateComponent,
    PublicComponent,
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    TranslateModule,
    FormsModule,
    FileUploadModule,
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
