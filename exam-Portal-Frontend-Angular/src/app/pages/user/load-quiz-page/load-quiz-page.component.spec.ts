import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadQuizPageComponent } from './load-quiz-page.component';

describe('LoadQuizPageComponent', () => {
  let component: LoadQuizPageComponent;
  let fixture: ComponentFixture<LoadQuizPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadQuizPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadQuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
