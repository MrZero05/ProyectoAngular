import { TestBed } from '@angular/core/testing';

import { ValidateuserService } from './validateuser.service';

describe('ValidateuserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidateuserService = TestBed.get(ValidateuserService);
    expect(service).toBeTruthy();
  });
});
