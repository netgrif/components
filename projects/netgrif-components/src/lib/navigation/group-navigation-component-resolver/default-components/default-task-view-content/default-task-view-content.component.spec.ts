import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultTaskViewContentComponent } from './default-task-view-content.component';

describe('DefaultTaskViewContentComponent', () => {
  let component: DefaultTaskViewContentComponent;
  let fixture: ComponentFixture<DefaultTaskViewContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultTaskViewContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultTaskViewContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
