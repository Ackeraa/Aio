import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemSetsComponent } from './problem-sets.component';

describe('ProblemSetsComponent', () => {
  let component: ProblemSetsComponent;
  let fixture: ComponentFixture<ProblemSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemSetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
