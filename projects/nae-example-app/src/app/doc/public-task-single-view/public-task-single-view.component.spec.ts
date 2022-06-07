import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTaskSingleViewComponent } from './public-task-single-view.component';

describe('PublicTaskSingleViewComponent', () => {
  let component: PublicTaskSingleViewComponent;
  let fixture: ComponentFixture<PublicTaskSingleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicTaskSingleViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicTaskSingleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
