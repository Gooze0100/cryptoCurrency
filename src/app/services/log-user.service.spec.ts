import { TestBed } from '@angular/core/testing';

import { LogUserService } from './log-user.service';

describe('LogUserService', () => {
  let service: LogUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
