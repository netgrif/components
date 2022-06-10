import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSingleTaskViewComponent } from './public-single-task-view.component';

describe('PublicTaskSingleViewComponent', () => {
  let component: PublicSingleTaskViewComponent;
  let fixture: ComponentFixture<PublicSingleTaskViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicSingleTaskViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSingleTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
