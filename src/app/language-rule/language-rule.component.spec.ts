import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageRuleComponent } from './language-rule.component';

describe('LanguageRuleComponent', () => {
  let component: LanguageRuleComponent;
  let fixture: ComponentFixture<LanguageRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
