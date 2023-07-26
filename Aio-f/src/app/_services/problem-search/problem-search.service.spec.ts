import { TestBed } from '@angular/core/testing';

import { ProblemSearchService } from './problem-search.service';

describe('ProblemSearchService', () => {
  let service: ProblemSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProblemSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
