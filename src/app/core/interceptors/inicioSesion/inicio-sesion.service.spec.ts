import { TestBed } from '@angular/core/testing';

import { InicioSesionService } from './inicio-sesion.service';

describe('InicioSesionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InicioSesionService = TestBed.get(InicioSesionService);
    expect(service).toBeTruthy();
  });
});
