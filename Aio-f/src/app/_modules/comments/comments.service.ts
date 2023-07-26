import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchService } from '../';
import { AuthService } from '../../_services/';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(
    private searchService: SearchService,
    private authService: AuthService
  ) {}

  getComments(which: string, page: number): Observable<any> {
    return this.searchService.get({ page });
  }

  voteUp(id: number): Observable<any> {
    let url = 'comments/vote_up';
    let body = { id: id };
    return this.authService.post(url, body);
  }

  voteDown(id: number): Observable<any> {
    let url = 'comments/vote_down';
    let body = { id: id };
    return this.authService.post(url, body);
  }

  create(parent_id: number, which: string, description: string) {
    let url = 'comments';
    let body;
    if (parent_id == 0) {
      body = { which: which, description: description };
    } else {
      body = { parent_id: parent_id, which: which, description: description };
    }
    // need to be fixed
    this.authService.post(url, body).subscribe((data) => {
      console.log(data);
    });
  }
}
