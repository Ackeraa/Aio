import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  id: string;
  homeInfo$: BehaviorSubject<any> = new BehaviorSubject(null);
  contests$: BehaviorSubject<any> = new BehaviorSubject(null);
  problemSets$: BehaviorSubject<any> = new BehaviorSubject(null);
  members$: BehaviorSubject<any> = new BehaviorSubject(null);

  isSelf: boolean;

  constructor(private authService: AuthService) {}

  getGroup(id: string): void {
    this.id = id;
    this.isSelf = false;
    let url = `groups/${id}/get_info`;
    this.authService.get(url).subscribe((info) => {
      info.leader = JSON.parse(info.leader);
      this.homeInfo$.next(info);
    });
  }

  getMembers(): void {
    this.members$.subscribe((groups) => {
      if (groups === null) {
        let url = `groups/${this.id}/get_members`;
        this.authService.get(url).subscribe((members) => {
          this.members$.next(members);
        });
      }
    });
  }

  getContests(): void {
    this.contests$.subscribe((contests) => {
      if (contests === null) {
        let url = `groups/${this.id}/get_contests`;
        this.authService
          .get(url)
          .subscribe((contests) => this.contests$.next(contests));
      }
    });
  }

  getProblemSets(): void {
    this.problemSets$.subscribe((problems) => {
      if (problems === null) {
        let url = `groups/${this.id}/get_problem_sets`;
        this.authService
          .get(url)
          .subscribe((problemSets) => this.problemSets$.next(problemSets));
      }
    });
  }
}
