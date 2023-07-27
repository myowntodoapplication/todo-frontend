import { TestBed } from '@angular/core/testing';

import { FilehandlingService } from './filehandling.service';

describe('FilehandlingService', () => {
  let service: FilehandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilehandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
