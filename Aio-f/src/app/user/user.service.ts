import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  id: string;
  homeInfo$: BehaviorSubject<any> = new BehaviorSubject(null);
  contests$: BehaviorSubject<any> = new BehaviorSubject(null);
  problems$: BehaviorSubject<any> = new BehaviorSubject(null);
  groups$: BehaviorSubject<any> = new BehaviorSubject(null);
  friends$: BehaviorSubject<any> = new BehaviorSubject(null);

  isSelf: boolean;

  constructor(private authService: AuthService) {}

  getUser(id: string): void {
    if (id) {
      this.id = id;
      this.isSelf = false;
      let url = `/users/${id}/get_info`;
      this.authService.get(url).subscribe((info) => {
        this.homeInfo$.next(info);
      });
    } else {
      this.isSelf = true;
      this.authService.user$
        .pipe(filter((x) => x != null))
        .subscribe((user) => {
          let url = `/users/${user.user_id}/get_info`;
          this.id = user.user_id;
          this.authService.get(url).subscribe((info) => {
            this.homeInfo$.next(info);
          });
        });
    }
  }

  getContests(): void {
    this.contests$.subscribe((contests) => {
      if (contests === null) {
        let url = `/users/${this.id}/get_contests`;
        this.authService.get(url).subscribe((contests) => {
          console.log(contests);
          this.contests$.next(contests);
        });
      }
    });
  }

  getProblems(): void {
    this.problems$.subscribe((problems) => {
      if (problems === null) {
        let url = `/users/${this.id}/get_problems`;
        this.authService
          .get(url)
          .subscribe((problems) => this.problems$.next(problems));
      }
    });
  }

  getGroups(): void {
    this.groups$.subscribe((groups) => {
      if (groups === null) {
        let url = `/users/${this.id}/get_groups`;
        this.authService
          .get(url)
          .subscribe((groups) => this.groups$.next(groups));
      }
    });
  }

  getFriends(): void {
    this.friends$.subscribe((friends) => {
      if (friends === null) {
        let url = `/users/${this.id}/get_friends`;
        this.authService
          .get(url)
          .subscribe((friends) => this.friends$.next(friends));
      }
    });
  }

  updateUserName(): void {
    //this.authService.getUserInfo();
  }

  changeGeneral(data: any): any {
    let url = `/users/${this.id}`;
    return this.authService.put(url, data);
  }

  changePassword(data: any): Observable<any> {
    return this.authService.logout();
  }

  connect(which: string, account: any): Observable<any> {
    let url = `/users/${this.id}/connect`;
    let data = { which: which, account: account };
    return this.authService.post(url, data);
  }
}
