import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  ],
  exports: [UserComponent],
})
export class UserModule {}
