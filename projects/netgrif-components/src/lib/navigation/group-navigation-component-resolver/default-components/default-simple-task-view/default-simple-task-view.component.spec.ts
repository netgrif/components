import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultSimpleTaskViewComponent } from './default-simple-task-view.component';

describe('DefaultSimpleTaskViewComponent', () => {
  let component: DefaultSimpleTaskViewComponent;
  let fixture: ComponentFixture<DefaultSimpleTaskViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultSimpleTaskViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultSimpleTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
