import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth';
import { SearchService, SearchParams } from '../';

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
    return this.authService.post('/comments/vote_up', { id: id });
  }

  voteDown(id: number): Observable<any> {
    return this.authService.post('/comments/vote_down', { id: id });
  }

  createComment(
    parent_id: number,
    which: string,
    description: string
  ): Observable<any> {
    return this.authService.post('/comments', {
      parent_id: parent_id,
      which: which,
      description: description,
    });
  }
}
