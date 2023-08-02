import { TestBed } from '@angular/core/testing';

import { CreateEditValidatorService } from './create-edit-validator.service';

describe('CreateEditValidatorService', () => {
  let service: CreateEditValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateEditValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
