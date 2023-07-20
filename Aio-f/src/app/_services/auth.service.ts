import { Injectable, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Subject, BehaviorSubject, Observable, AsyncSubject } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface User {
  user_id: string,
  user_name: string
}

@Injectable()
export class AuthService implements OnInit {

  private baseUrl = environment.token_auth_config.apiBase;

	private user_$: BehaviorSubject<User | null | undefined> = new BehaviorSubject(undefined);
  user$ = this.user_$.pipe(skipWhile(val => val === undefined)) as Observable<User | null>;

  private res_$: Subject<any> = new Subject();
  res$ = this.res_$ as Observable<any>;

  private errors_$: Subject<any> = new Subject();
  errors$ = this.errors_$ as Observable<any>;

	constructor(public tokenService: AngularTokenService,
              private http: HttpClient) {
		this.tokenService.validateToken()
      .subscribe(
        res => {
          let user = res.data;
          this.user_$.next({
            user_id: user.id,
            user_name: user.name
          });
          this.errors_$.next(null);
        },
        err => {
          this.user_$.next(null);
          let errors = err.error.errors;
          this.errors_$.next(errors);
        }
      );
	}

  getHeaders(): HttpHeaders {
    let token = this.tokenService.currentAuthData;
    if (token === null) {
      return new HttpHeaders();
    }
    return new HttpHeaders({
      'access-token': token['accessToken'],
      'client': token['client'],
      'expiry': token['expiry'],
      'token-Type': token['tokenType'],
      'uid': token['uid']
    });
  }

	get(url: string, params: any = null): Observable<any> {
    const fullUrl = this.baseUrl + url;
    const headers = this.getHeaders();
    let queryParams: HttpParams;

    if (params) {
      queryParams = new HttpParams({ fromObject: params });
    }

    return this.http.get(fullUrl, { headers: headers, params: queryParams });
	}

	post(url: string, body: any): Observable<any> {
    const fullUrl = this.baseUrl + url;
    const headers = this.getHeaders();

    return this.http.post(url, body, { headers: headers });
	}

  put(url: string, body: any): Observable<any> {
    const fullUrl = this.baseUrl + url;
    const headers = this.getHeaders();

    return this.http.put(url, body, { headers: headers });
  }

  isLoggedIn(): boolean {
    return this.tokenService.userSignedIn();
  }

	register(data: { name: string, login: string, password: string, passwordConfirmation: string }) {
		this.tokenService.registerAccount(data).subscribe(
      res => {
        this.errors_$.next(null);
      },
      err => {
        let errors = err.error.errors;
        this.errors_$.next(errors);
      }
    );
	}

  login(data: { login: string, password: string }) {
    this.tokenService.signIn(data).subscribe(
      res => {
        let user = res.body.data;
        this.user_$.next({
          user_id: user.id,
          user_name: user.name
        });
        this.errors_$.next(null);
      },
      err => {
        this.user_$.next(null);
        let errors = err.error.errors;
        this.errors_$.next(errors);
      }
    );
	}

  logout() {
    this.tokenService.signOut().subscribe(
      res => {
        this.user_$.next(null);
        this.errors_$.next(null);
      }
    );
	}

  // Send email to reset password
  forgot(data: { email: string }) {
    const url = '/auth/password';
    const newData = {
      email: data.email,
      redirect_url: environment.token_auth_config.resetPasswordCallback
    };
    return this.post(url, newData);
  }

  // Reset password
  reset(data: { password: string, passwordConfirmation: string }, token: any) {
    const url = '/auth/password';
    const newData = {
      password: data.password,
      password_confirmation: data.passwordConfirmation
    };
    const headers = new HttpHeaders({
      'access-token': token['accessToken'],
      'client': token['client'],
      'expiry': token['expiry'],
      'uid': token['uid']
    });
    return this.http.put(url, newData, { headers: headers });
  }

	ngOnInit(): void {
	}
}
