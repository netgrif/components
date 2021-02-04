import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarExampleComponent } from './toolbar-example.component';

describe('ToolbarExampleComponent', () => {
  let component: ToolbarExampleComponent;
  let fixture: ComponentFixture<ToolbarExampleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
