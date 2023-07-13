import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MarkdownModule} from 'ngx-markdown';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProblemSearchModule } from './_components';
import { SearchModule } from './_components';
import { CommentsModule } from './_components';
import { SubmissionsModule } from './_components';
import { HomeModule } from './home';
import { GroupModule } from './group/group.module';
import { GroupsModule } from './groups/groups.module';
import { UserModule } from './user/user.module';

import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { ContestsComponent } from './contests';
import { ContestComponent } from './contest';
import { ProblemsComponent } from './problems';
import { ProblemComponent } from './problem';
import { ProblemSetsComponent } from './problem-sets';
import { ProblemSetComponent } from './problem-set';
import { SubmissionsComponent } from './submissions';
import { DiscussionComponent } from './discussion';
import { UsersComponent } from './users';
import { GroupsComponent } from './groups';
import { WikiComponent } from './wiki';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
//import { AngularTokenService } from 'angular-token';
import { AngularTokenModule } from 'angular-token';
import { AuthService } from "./_services/auth.service";
import { ActionCableService } from 'angular2-actioncable';

import {
	AlertComponent,
	HeaderComponent,
	FooterComponent 
} from './_components';

@NgModule({
	imports: [
		MarkdownModule.forRoot(),
		HttpClientModule,
    AngularTokenModule.forRoot({
      apiBase: 'http://localhost:3000',
      registerAccountCallback: 'http://127.0.0.1:4200/login',
    }),
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		FileUploadModule,
		AppRoutingModule,
		NgxPaginationModule,
    FontAwesomeModule,
		ProblemSearchModule,
		SearchModule,
		CommentsModule,
		SubmissionsModule,
		HomeModule,
		GroupModule,
		GroupsModule,
		UserModule,
		FormsModule,
		HttpModule,
	],
	declarations: [
		AppComponent,
		HomeComponent,
		LoginComponent,
		RegisterComponent,
		ContestsComponent,
		SubmissionsComponent,
		ProblemsComponent,
		ProblemComponent,
		UsersComponent,
		WikiComponent,
		ContestComponent,
		AlertComponent,
		HeaderComponent,
		FooterComponent,
		ProblemSetsComponent,
		ProblemSetComponent,
		DiscussionComponent,
		GroupsComponent
	],
	providers: [
		//{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

		//AngularTokenService,
    AngularTokenModule,
		AuthService,
		ActionCableService 
	],
  exports: [
  ],
	bootstrap: [AppComponent]
})
export class AppModule { };
