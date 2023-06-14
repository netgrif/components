import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultTaskViewComponent } from './default-task-view.component';

describe('DefaultTaskViewComponent', () => {
  let component: DefaultTaskViewComponent;
  let fixture: ComponentFixture<DefaultTaskViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultTaskViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
