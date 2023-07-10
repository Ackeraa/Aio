import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContestsRoutingModule } from './contests-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchModule } from '../_components/search/search.module';
import {
	ContestsComponent,
	CreateComponent,
	RecentComponent,
	PastComponent 
} from '.';

@NgModule({
	declarations: [
		CreateComponent,
		RecentComponent,
		PastComponent
	],
	imports: [
		CommonModule,
		NgbModule,
		ContestsRoutingModule,
		FormsModule,
		NgxPaginationModule,
		SearchModule,
		ReactiveFormsModule,
	],
	exports: [
	]
})
export class ContestsModule { }
