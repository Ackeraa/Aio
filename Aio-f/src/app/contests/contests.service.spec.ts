import { TestBed } from '@angular/core/testing';

import { ContestsService } from './contests.service';

describe('ContestsService', () => {
  let service: ContestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
