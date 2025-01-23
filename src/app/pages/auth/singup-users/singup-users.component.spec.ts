import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingupUsersComponent } from './singup-users.component';

describe('SingupUsersComponent', () => {
  let component: SingupUsersComponent;
  let fixture: ComponentFixture<SingupUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingupUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingupUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
