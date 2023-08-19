import { Injectable } from '@angular/core';
import {
  Subject,
  BehaviorSubject,
  filter,
  take,
} from 'rxjs';
import { AuthService } from '../auth';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  id: number;
  homeInfo$: BehaviorSubject<any> = new BehaviorSubject(null);
  contests$: BehaviorSubject<any> = new BehaviorSubject(null);
  problemSets$: BehaviorSubject<any> = new BehaviorSubject(null);
  members$: BehaviorSubject<any> = new BehaviorSubject(null);
  error$: Subject<any> = new Subject();

  isSelf: boolean;

  constructor(private authService: AuthService) {}

  private get(subject$: BehaviorSubject<any>, url: string): void {
    subject$.pipe(take(1)).subscribe({
      next: (data) => {
        if (data === null) {
          this.authService.get(`/groups/${this.id}/${url}`).subscribe({
            next: (data) => {
              console.log(data);
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
    } else {
      this.isSelf = true;
      this.authService.user$
        .pipe(filter((x) => x != null))
        .subscribe((user) => {
          this.id = user.id;
          this.get(this.homeInfo$, 'get_info');
        });
    }
  }

  getMembers(): void {
    this.get(this.members$, 'get_members');
  }

  getContests(): void {
    this.get(this.contests$, 'get_contests');
  }

  getProblemSets(): void {
    this.get(this.problemSets$, 'get_problem_sets');
  }
}
