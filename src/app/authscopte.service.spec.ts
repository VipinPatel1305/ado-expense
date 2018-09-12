import { TestBed, inject } from '@angular/core/testing';

import { AuthscopteService } from './authscopte.service';

describe('AuthscopteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthscopteService]
    });
  });

  it('should be created', inject([AuthscopteService], (service: AuthscopteService) => {
    expect(service).toBeTruthy();
  }));
});
