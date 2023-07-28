import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private authService: AuthService) {}

  getInfo(): Observable<any> {
    let url = '/homes';
    return this.authService.get(url);
  }
}
