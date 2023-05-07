import { TestBed } from '@angular/core/testing';

import { ScrumboardService } from './scrumboard.service';

describe('ScrumboardService', () => {
  let service: ScrumboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrumboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
