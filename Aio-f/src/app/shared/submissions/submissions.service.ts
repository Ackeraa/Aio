import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionCableService, Channel } from 'angular2-actioncable';
import { SearchService } from '../';

@Injectable({
  providedIn: 'root',
})
export class SubmissionsService {
  constructor(
    private searchService: SearchService,
    private cableService: ActionCableService
  ) {}

  getSubmissionsChannel(params: any): Observable<any> {
    let url = 'ws://127.0.0.1:3000/cable';
    let channel = 'SubmissionsChannel';
    return this.cableService.cable(url, params).channel(channel).received();
  }

  getSubmissionsPage(page: number): Observable<any> {
    return this.searchService.get('', { page });
  }
}
