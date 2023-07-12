import { Injectable, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { BehaviorSubject, Observable, AsyncSubject } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';  // maybe fix this, remove operators

interface User {
  user_id: string,
  user_name: string
}

@Injectable()
export class AuthService implements OnInit{

	public user$: BehaviorSubject<User> = new BehaviorSubject(null);
  public errors$: BehaviorSubject<any> = new BehaviorSubject(null);

	constructor(public tokenService: AngularTokenService,
              private http: Http) {
		this.tokenService.validateToken()
      .subscribe(
        res => {
          let user = JSON.parse(JSON.stringify(res)).data;
          this.user$.next({
            user_id: user.id,
            user_name: user.name
          });
          this.errors$.next(null);
        },
        err => {
          this.user$.next(null);
          let errors = JSON.parse(JSON.stringify(err)).error.errors;
          this.errors$.next(errors);
        }
      );
	}

	register(data) {
		this.tokenService.registerAccount(data).subscribe(
      res => {
        this.errors$.next(null);
      },
      err => {
        let errors = err.error.errors;
        this.errors$.next(errors);
      }
    );
	}

	logIn(data) {
    this.tokenService.signIn(data).subscribe(
      res => { 
        let user = res.body.data;
        this.user$.next({
          user_id: user.id,
          user_name: user.name
        });
        this.errors$.next(null);
      },
      err => {
        this.user$.next(null);
        let errors = err.error.errors;
        this.errors$.next(errors);
      }
    );
	}

	logOut() {
    this.tokenService.signOut().subscribe(
      res => {
        this.user$.next(null);
        this.errors$.next(null);
      }
    );
	}

	get(url: string, params: any = null): Observable<any> {
    url = 'http://localhost:3000/' + url;

    let headers = new Headers();
    let token = this.tokenService.currentAuthData;
    if (token != null) {
      headers.append('access-token', token['accessToken']);
      headers.append('client', token['client']);
      headers.append('expiry', token['expiry']);
      headers.append('token-Type', token['tokenType']);
      headers.append('uid', token['uid']);
    }

		if (params == null) {
      return this.http.get(url).pipe(map((res: Response) => res.json()));
		} else {
      return this.http.get(url, { headers: headers, params: params }).pipe(map((res: Response) => res.json()));
		}
	}

	post(url: string, body: any): Observable<any> {
    url = 'http://localhost:3000/' + url;


    let headers = new Headers();
    let token = this.tokenService.currentAuthData;
    if (token != null) {
      headers.append('access-token', token['accessToken']);
      headers.append('client', token['client']);
      headers.append('expiry', token['expiry']);
      headers.append('token-Type', token['tokenType']);
      headers.append('uid', token['uid']);
    }

    return this.http.post(url, body, { headers: headers }).pipe(map((res: Response) => res.json()));
	}

	ngOnInit(): void {
	}
}
