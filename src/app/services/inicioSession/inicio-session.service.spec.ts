import { TestBed } from '@angular/core/testing';

import { InicioSessionService } from './inicio-session.service';

describe('InicioSessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InicioSessionService = TestBed.get(InicioSessionService);
    expect(service).toBeTruthy();
  });
});
