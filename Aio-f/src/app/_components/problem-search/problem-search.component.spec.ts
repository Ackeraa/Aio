import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemSearchComponent } from './problem-search.component';

describe('ProblemSearchComponent', () => {
  let component: ProblemSearchComponent;
  let fixture: ComponentFixture<ProblemSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
