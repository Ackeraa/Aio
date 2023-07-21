import { Injectable, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import {
  BehaviorSubject,
  Observable,
  throwError,
  skipWhile,
  catchError,
  tap,
  finalize,
} from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface User {
  user_id: string;
  user_name: string;
}

@Injectable()
export class AuthService implements OnInit {
  private baseUrl = environment.token_auth_config.apiBase;

  private user_$: BehaviorSubject<User | null | undefined> =
    new BehaviorSubject(undefined);
  user$ = this.user_$.pipe(
    skipWhile(val => val === undefined)
  ) as Observable<User | null>;

  constructor(
    public tokenService: AngularTokenService,
    private http: HttpClient
  ) {
    this.tokenService.validateToken().subscribe({
      next: res => {
        let user = res.data;
        this.user_$.next({
          user_id: user.id,
          user_name: user.name,
        });
      },
      error: err => {
        this.user_$.next(null);
      },
    });
  }

  getHeaders(): HttpHeaders {
    let token = this.tokenService.currentAuthData;
    if (token) {
      return new HttpHeaders({
        'access-token': token['accessToken'],
        client: token['client'],
        expiry: token['expiry'],
        'token-Type': token['tokenType'],
        uid: token['uid'],
      });
    }
    return new HttpHeaders();
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

    return this.http.post(fullUrl, body, { headers: headers });
  }

  put(url: string, body: any): Observable<any> {
    const fullUrl = this.baseUrl + url;
    const headers = this.getHeaders();

    return this.http.put(fullUrl, body, { headers: headers });
  }

  isLoggedIn(): boolean {
    return this.tokenService.userSignedIn();
  }

  register(data: {
    name: string;
    login: string;
    password: string;
    passwordConfirmation: string;
  }): Observable<any> {
    return this.tokenService.registerAccount(data).pipe(
      catchError(err => {
        let errors = err.error.errors;
        return throwError(() => errors);
      })
    );
  }

  login(data: { login: string; password: string }): Observable<any> {
    return this.tokenService.signIn(data).pipe(
      tap(res => {
        let user = res.body.data;
        this.user_$.next({
          user_id: user.id,
          user_name: user.name,
        });
      }),
      catchError(err => {
        this.user_$.next(null);
        console.log(err);
        let errors = err.error.errors;
        return throwError(() => errors);
      })
    );
  }

  logout() {
    return this.tokenService.signOut().pipe(
      finalize(() => {
        this.user_$.next(null);
      }),
      catchError(err => {
        let errors = err.error.errors;
        return throwError(() => errors);
      })
    );
  }

  // Send email to reset password
  forgot(data: { email: string }): Observable<any> {
    const url = '/auth/password';
    const newData = {
      email: data.email,
      redirect_url: environment.token_auth_config.resetPasswordCallback,
    };
    return this.post(url, newData);
  }

  // Reset password
  reset(
    data: {
      password: string;
      passwordConfirmation: string;
    },
    token: any
  ): Observable<any> {
    const url = '/auth/password';
    const newData = {
      password: data.password,
      password_confirmation: data.passwordConfirmation,
    };
    const headers = new HttpHeaders({
      'access-token': token['accessToken'],
      client: token['client'],
      expiry: token['expiry'],
      uid: token['uid'],
    });
    return this.http.put(url, newData, { headers: headers });
  }

  ngOnInit(): void {}
}
