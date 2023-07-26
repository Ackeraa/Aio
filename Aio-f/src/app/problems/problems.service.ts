import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProblemSearchService } from '../_services';

@Injectable({
  providedIn: 'root',
})
export class ProblemsService {
  constructor(private ProblemSearchService: ProblemSearchService) {}

  getCollectionProblems(params: any): Observable<any> {
    return this.ProblemSearchService.get(params);
  }

  getCollectionPage(): number {
    return this.ProblemSearchService.getPage();
  }
}
