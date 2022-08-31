import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleDrawerExampleComponent } from './double-drawer-example.component';

describe('DrawerControlsComponent', () => {
  let component: DoubleDrawerExampleComponent;
  let fixture: ComponentFixture<DoubleDrawerExampleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubleDrawerExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleDrawerExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
