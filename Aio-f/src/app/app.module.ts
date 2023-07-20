import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MarkdownModule} from 'ngx-markdown';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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

import { environment } from "../environments/environment";

import {
	AlertComponent,
	HeaderComponent,
	FooterComponent
} from './_components';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordForgotComponent } from './password-forgot/password-forgot.component';

@NgModule({
	imports: [
		MarkdownModule.forRoot(),
		HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      },
      defaultLanguage: environment.defaultLang
    }),

    AngularTokenModule.forRoot({
      apiBase: environment.token_auth_config.apiBase,
      registerAccountCallback: environment.token_auth_config.registerAccountCallback
    }),
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		FileUploadModule,
		AppRoutingModule,
		FormsModule,
    HttpClientModule,
		NgxPaginationModule,
    NgbModule,
    FontAwesomeModule,
		ProblemSearchModule,
		SearchModule,
		CommentsModule,
		SubmissionsModule,
		HomeModule,
		GroupModule,
		GroupsModule,
		UserModule,
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
		GroupsComponent,
    PasswordResetComponent,
    PasswordForgotComponent,
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
