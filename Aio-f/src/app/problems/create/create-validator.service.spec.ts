import { TestBed } from '@angular/core/testing';

import { CreateValidatorService } from './create-validator.service';

describe('CreateValidatorService', () => {
  let service: CreateValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
