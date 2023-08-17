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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface User {
  id: string;
  role: string;
  name: string;
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
          id: user.id,
          role: user.role,
          name: user.name,
        });
      },
      error: () => {
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

  fullUrl(url: string): string {
    return this.baseUrl + url;
  }

  get(url: string, params: any = undefined): Observable<any> {
    return this.http.get(this.fullUrl(url), {
      headers: this.getHeaders(),
      params: params,
    });
  }

  post(url: string, body: any): Observable<any> {
    return this.http.post(this.fullUrl(url), body, {
      headers: this.getHeaders(),
    });
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${url}`, body, {
      headers: this.getHeaders(),
    });
  }

  delete(url: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${url}`, {
      headers: this.getHeaders(),
    });
  }

  isLoggedIn(): boolean {
    return this.user_$.getValue() !== null;
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
          id: user.id,
          role: user.role,
          name: user.name,
        });
      }),
      catchError(err => {
        this.user_$.next(null);
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
    return this.post(url, newData).pipe(
      catchError(err => {
        let errors = err.error.errors;
        return throwError(() => errors);
      })
    );
  }

  // Reset password
  reset(
    data: {
      password: string;
      passwordConfirmation: string;
    },
    token: any
  ): Observable<any> {
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
    return this.http.put(this.fullUrl('/auth/password'), newData, {
      headers: headers,
    });
  }

  ngOnInit(): void {}
}
