import { TestBed } from '@angular/core/testing';

import { ProblemSetsService } from './problem-sets.service';

describe('ProblemSetsService', () => {
  let service: ProblemSetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProblemSetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
