import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTaskComponent } from './single-task.component';

describe('TaskPanelSingleComponent', () => {
  let component: SingleTaskComponent;
  let fixture: ComponentFixture<SingleTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
