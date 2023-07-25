import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProblemSearchService } from '../_services';

@Injectable({
  providedIn: 'root',
})
export class ProblemsService {
  constructor(private ProblemSearchService: ProblemSearchService) {}

  getPage(page: number): Observable<any> {
    return this.ProblemSearchService.getPage(page);
  }
}
