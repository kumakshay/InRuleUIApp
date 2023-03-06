import { TestBed } from '@angular/core/testing';

import { LanguageRuleService } from './language-rule.service';

describe('LanguageRuleService', () => {
  let service: LanguageRuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageRuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
