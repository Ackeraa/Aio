import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContestsModule } from '../contests';
import { ProblemsModule } from '../problems';
import { GroupsModule } from '../groups';
import {
  UserComponent,
  HomeComponent,
  ContestsComponent,
  ProblemsComponent,
  GroupsComponent,
  FriendsComponent,
  SettingsComponent,
} from '.';

@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    ContestsComponent,
    ProblemsComponent,
    GroupsComponent,
    FriendsComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    FileUploadModule,
    NgxPaginationModule,
    ContestsModule,
    ProblemsModule,
    GroupsModule,
  ],
  exports: [UserComponent],
})
export class UserModule {}
