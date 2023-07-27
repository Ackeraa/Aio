import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, SearchService, SearchParams } from '../';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(
    private searchService: SearchService,
    private authService: AuthService
  ) {}

  getComments(url: string, params: SearchParams): Observable<any> {
    return this.searchService.get(url, params);
  }

  getCommentsPage(): SearchParams {
    return { page: this.searchService.getPage() };
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
    let body;
    if (parent_id == 0) {
      body = { which: which, description: description };
    } else {
      body = { parent_id: parent_id, which: which, description: description };
    }
    // need to be fixed
    this.authService.post('/comments', body).subscribe((data) => {
      console.log(data);
    });
  }
}
