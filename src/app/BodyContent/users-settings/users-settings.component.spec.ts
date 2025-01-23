import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSettings } from './users-settings.component';

describe('UsersSettingsComponent', () => {
  let component: UsersSettings;
  let fixture: ComponentFixture<UsersSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
