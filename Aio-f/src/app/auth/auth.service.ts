import { Injectable, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Observable, throwError, catchError, tap, finalize } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService implements OnInit {
  baseUrl = environment.token_auth_config.apiBase;

  constructor(
    public tokenService: AngularTokenService,
    private http: HttpClient
  ) {}

  setUser() {
    this.tokenService.validateToken().subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
      },
      error: () => {
        localStorage.removeItem('user');
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

  register(data: {
    name: string;
    login: string;
    password: string;
    passwordConfirmation: string;
  }): Observable<any> {
    return this.tokenService.registerAccount(data).pipe(
      catchError((err) => {
        let errors = err.error.errors;
        return throwError(() => errors);
      })
    );
  }

  login(data: { login: string; password: string }): Observable<any> {
    return this.tokenService.signIn(data).pipe(
      tap((res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
      }),
      catchError((err) => {
        localStorage.removeItem('user');
        const errors = err.error.errors;
        return throwError(() => errors);
      })
    );
  }

  logout() {
    return this.tokenService.signOut().pipe(
      finalize(() => {
        localStorage.removeItem('user');
      }),
      catchError((err) => {
        const errors = err.error.errors;
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
      catchError((err) => {
        const errors = err.error.errors;
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
