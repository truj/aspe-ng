import { TestBed } from '@angular/core/testing';

import { InitializorService } from './initializor.service';

describe('InitializorService', () => {
  let service: InitializorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitializorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
