import { TestBed } from '@angular/core/testing';

import { ProblemSetService } from './problem-set.service';

describe('ProblemSetService', () => {
  let service: ProblemSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProblemSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
