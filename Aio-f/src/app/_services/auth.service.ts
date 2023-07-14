import { Injectable, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { BehaviorSubject, Observable, AsyncSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
              private http: HttpClient) {
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

    let token = this.tokenService.currentAuthData;
    let headers = new HttpHeaders({
      'access-token': token['accessToken'],
      'client': token['client'],
      'expiry': token['expiry'],
      'token-Type': token['tokenType'],
      'uid': token['uid']
    });

		if (params == null) {
      return this.http.get(url).pipe(map((res: Response) => res.json()));
		} else {
      return this.http.get(url, { headers: headers, params: params }).pipe(map((res: Response) => res.json()));
		}
	}

	post(url: string, body: any): Observable<any> {
    url = 'http://localhost:3000/' + url;

    let token = this.tokenService.currentAuthData;
    let headers = new HttpHeaders({
      'access-token': token['accessToken'],
      'client': token['client'],
      'expiry': token['expiry'],
      'token-Type': token['tokenType'],
      'uid': token['uid']
    });

    return this.http.post(url, body, { headers: headers }).pipe(map((res: Response) => res.json()));
	}

	ngOnInit(): void {
	}
}
