import { Injectable, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Subject, BehaviorSubject, Observable, AsyncSubject } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface User {
  user_id: string,
  user_name: string
}

@Injectable()
export class AuthService implements OnInit{

	private user_$: BehaviorSubject<User | null | undefined> = new BehaviorSubject(undefined);
  user$ = this.user_$.pipe(skipWhile(val => val === undefined)) as Observable<User | null>;

  private errors_$: Subject<any> = new Subject();
  errors$ = this.errors_$ as Observable<any>;

  public message$: BehaviorSubject<string | null> = new BehaviorSubject(null);

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

  isLoggedIn() {
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

  // send email to reset password
  forgot(data: { email: string }) {
  }

  // reset password
  reset() {
  }

	get(url: string, params: any = null): Observable<any> {
    url = 'http://localhost:3000/' + url;

    let headers = new HttpHeaders();
    let token = this.tokenService.currentAuthData;
    if (token != null) {
      let newHeaders = new HttpHeaders({
        'access-token': token['accessToken'],
        'client': token['client'],
        'expiry': token['expiry'],
        'token-Type': token['tokenType'],
        'uid': token['uid']
      });
      headers = newHeaders;
    }

		if (params == null) {
      return this.http.get(url);
		} else {
      return this.http.get(url, { headers: headers, params: params });
		}
	}

	post(url: string, body: any): Observable<any> {
    url = 'http://localhost:3000/' + url;

    let headers = new HttpHeaders();
    let token = this.tokenService.currentAuthData;
    if (token != null) {
      let newHeaders = new HttpHeaders({
        'access-token': token['accessToken'],
        'client': token['client'],
        'expiry': token['expiry'],
        'token-Type': token['tokenType'],
        'uid': token['uid']
      });
      headers = newHeaders;
    }

    return this.http.post(url, body, { headers: headers });
	}

	ngOnInit(): void {
	}
}
