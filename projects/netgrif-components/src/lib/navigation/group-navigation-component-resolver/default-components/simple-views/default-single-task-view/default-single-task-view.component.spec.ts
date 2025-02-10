import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultSingleTaskViewComponent } from './default-single-task-view.component';

describe('DefaultSingleTaskViewComponent', () => {
  let component: DefaultSingleTaskViewComponent;
  let fixture: ComponentFixture<DefaultSingleTaskViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultSingleTaskViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultSingleTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
