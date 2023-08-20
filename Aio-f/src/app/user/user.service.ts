import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, take } from 'rxjs';
import { AuthService } from '../auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  id: number;
  homeInfo$: BehaviorSubject<any> = new BehaviorSubject(null);
  contests$: BehaviorSubject<any> = new BehaviorSubject(null);
  problems$: BehaviorSubject<any> = new BehaviorSubject(null);
  groups$: BehaviorSubject<any> = new BehaviorSubject(null);
  friends$: BehaviorSubject<any> = new BehaviorSubject(null);
  photo$: BehaviorSubject<any> = new BehaviorSubject(null);
  error$: BehaviorSubject<any> = new BehaviorSubject(null);

  isSelf: boolean;

  constructor(private authService: AuthService) {}

  private get(subject$: BehaviorSubject<any>, url: string): void {
    subject$.pipe(take(1)).subscribe({
      next: (data) => {
        if (data === null) {
          this.authService.get(`/users/${this.id}/${url}`).subscribe({
            next: (data) => {
              subject$.next(data);
            },
            error: (err) => {
              this.error$.next(err);
            },
          });
        }
      },
    });
  }

  getInfo(id: number | null = null): void {
    if (id) {
      this.id = id;
      this.isSelf = false;
      this.get(this.homeInfo$, 'get_info');
      this.photo$.next(`${this.authService.baseUrl}/users/${id}/get_photo`);
    } else {
      this.isSelf = true;
      const user = JSON.parse(localStorage.getItem('user'));
      this.id = user.id;
      this.photo$.next(
        `${this.authService.baseUrl}/users/${user.id}/get_photo`
      );
      this.get(this.homeInfo$, 'get_info');
    }
  }

  getContests(): void {
    this.get(this.contests$, 'get_contests');
  }

  getProblems(): void {
    this.get(this.problems$, 'get_problems');
  }

  getGroups(): void {
    this.get(this.groups$, 'get_groups');
  }

  getFriends(): void {
    this.get(this.friends$, 'get_friends');
  }

  updateUserName(): void {
    //this.authService.getUserInfo();
  }

  uploadPhoto(data: any): Observable<any> {
    return this.authService.post(`/users/upload_photo`, data);
  }

  changeGeneral(data: any): any {
    return this.authService.put(`/users/${this.id}`, data);
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
