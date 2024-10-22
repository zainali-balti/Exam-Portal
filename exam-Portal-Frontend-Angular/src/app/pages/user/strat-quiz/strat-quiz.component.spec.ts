import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StratQuizComponent } from './strat-quiz.component';

describe('StratQuizComponent', () => {
  let component: StratQuizComponent;
  let fixture: ComponentFixture<StratQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StratQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StratQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
