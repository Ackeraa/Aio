import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';
import { SearchService, SearchParams } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(
    private searchService: SearchService,
    private authService: AuthService
  ) {}

  getGroups(params: SearchParams): Observable<any> {
    return this.searchService.get('/groups', params);
  }

  getGroupsPage(): SearchParams {
    return { page: this.searchService.getPage() };
  }

  getGroup(id: number): Observable<any> {
    return this.authService.get(`/groups/${id}`);
  }

  createGroup(data: any): Observable<any> {
    return this.authService.post('/groups', data);
  }

  updateGroup(id: number, data: any): Observable<any> {
    return this.authService.put(`/groups/${id}`, data);
  }

  deleteGroup(id: number): Observable<any> {
    return this.authService.delete(`/groups/${id}`);
  }

  joinGroup(id: number): Observable<any> {
    return this.authService.post(`/groups/${id}/join`, {});
  }

  leaveGroup(id: number): Observable<any> {
    return this.authService.post(`/groups/${id}/leave`, {});
  }
}
