import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';
import { SearchService, SearchParams } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private searchService: SearchService,
    private authService: AuthService
  ) { }

  getMessages(url: string, params: SearchParams): Observable<any> {
    return this.searchService.get(url, params);
  }

  getMessagesPage(): SearchParams {
    return { page: this.searchService.getPage() };
  }

  agree(id: number): Observable<any> {
    return this.authService.post(`/messages/${id}/agree`, {});
  }

  disagree(id: number): Observable<any> {
    return this.authService.post(`/messages/${id}/disagree`, {});
  }

  delete(id: number): Observable<any> {
    return this.authService.delete(`/messages/${id}`);
  }

  read(id: number): Observable<any> {
    return this.authService.post(`/messages/${id}/read`, {});
  }
}
