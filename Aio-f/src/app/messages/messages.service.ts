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

}
