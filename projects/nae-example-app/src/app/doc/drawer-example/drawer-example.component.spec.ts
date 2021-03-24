import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerExampleComponent } from './drawer-example.component';

describe('DrawerControlsComponent', () => {
  let component: DrawerExampleComponent;
  let fixture: ComponentFixture<DrawerExampleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawerExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
