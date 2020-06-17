import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeTaskContentComponent } from './tree-task-content.component';

describe('TreeTaskContentComponent', () => {
  let component: TreeTaskContentComponent;
  let fixture: ComponentFixture<TreeTaskContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeTaskContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeTaskContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
