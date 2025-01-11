import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupChoixComponent } from './signup-choix.component';

describe('SignupChoixComponent', () => {
  let component: SignupChoixComponent;
  let fixture: ComponentFixture<SignupChoixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupChoixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupChoixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
