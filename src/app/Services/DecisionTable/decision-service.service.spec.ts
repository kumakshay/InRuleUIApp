import { TestBed } from '@angular/core/testing';

import { DecisionServiceService } from './decision-service.service';

describe('DecisionServiceService', () => {
  let service: DecisionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecisionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
