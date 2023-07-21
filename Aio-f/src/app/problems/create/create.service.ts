import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CreateService {
  constructor(private http: HttpClient) {}
  submit(problem: any): void {
    this.http.post('/problems', JSON.stringify(problem)).subscribe(data => {
      console.log(data);
    });
  }
}
