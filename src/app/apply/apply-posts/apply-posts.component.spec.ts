import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyPostsComponent } from './apply-posts.component';

describe('ApplyPostsComponent', () => {
  let component: ApplyPostsComponent;
  let fixture: ComponentFixture<ApplyPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplyPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
