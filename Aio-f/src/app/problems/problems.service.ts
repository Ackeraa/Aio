import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProblemSearchService, ProblemSearchParams } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class ProblemsService {
  constructor(private ProblemSearchService: ProblemSearchService) {}

  getCollectionProblems(params: ProblemSearchParams): Observable<any> {
    return this.ProblemSearchService.get(params);
  }

  getCollectionPage(): ProblemSearchParams {
    return { page: this.ProblemSearchService.getPage() };
  }

  spideProblems(source: string): Observable<any> {
    return this.ProblemSearchService.spide(source);
  }
}
