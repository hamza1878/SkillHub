import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumesBuidlerComponent } from './resumes-buidler.component';

describe('ResumesBuidlerComponent', () => {
  let component: ResumesBuidlerComponent;
  let fixture: ComponentFixture<ResumesBuidlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumesBuidlerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumesBuidlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
