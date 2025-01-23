import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySettings } from './company-settings.component';

describe('CompanySettingsComponent', () => {
  let component: CompanySettings;
  let fixture: ComponentFixture<CompanySettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanySettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanySettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
