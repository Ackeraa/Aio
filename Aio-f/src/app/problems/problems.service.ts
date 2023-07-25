import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProblemSearchService } from '../_modules';

@Injectable({
  providedIn: 'root',
})
export class ProblemsService {
  constructor(private ProblemSearchService: ProblemSearchService) {}

  getCollectionProblems(page: number): Observable<any> {
    return this.ProblemSearchService.get({ page });
  }

  getCollectionPage(): number {
    return this.ProblemSearchService.getPage();
  }
}
