import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	UserComponent,
	HomeComponent,
	ContestsComponent,
	ProblemsComponent,
	GroupsComponent,
	FriendsComponent,
	SettingsComponent,
  GeneralSettingsComponent,
  PasswordSettingsComponent,
  PrivacySettingsComponent,
  ConnectionSettingsComponent
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
    GeneralSettingsComponent,
    PasswordSettingsComponent,
    PrivacySettingsComponent,
    ConnectionSettingsComponent
	],
	imports: [
		CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
	],
	exports: [
		UserComponent
	]
})
export class UserModule { }
