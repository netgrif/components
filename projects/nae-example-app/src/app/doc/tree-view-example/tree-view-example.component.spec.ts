import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewExampleComponent } from './tree-view-example.component';

describe('TreeViewExampleComponent', () => {
  let component: TreeViewExampleComponent;
  let fixture: ComponentFixture<TreeViewExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeViewExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeViewExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
