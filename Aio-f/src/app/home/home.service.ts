import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private authService: AuthService) {}

  getInfo(): Observable<any> {
    return this.authService.get('/homes');
  }
}
