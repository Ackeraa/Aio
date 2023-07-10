import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	UserComponent,
	HomeComponent,
	ContestsComponent,
	ProblemsComponent, 
	GroupsComponent, 
	FriendsComponent, 
	SettingsComponent
} from '.';

@NgModule({
	declarations: [
		UserComponent,
		HomeComponent,
		ContestsComponent,
		ProblemsComponent, 
		GroupsComponent, 
		FriendsComponent, 
		SettingsComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		UserComponent
	]
})
export class UserModule { }
