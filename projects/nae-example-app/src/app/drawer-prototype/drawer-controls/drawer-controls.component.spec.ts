import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerControlsComponent } from './drawer-controls.component';

describe('DrawerControlsComponent', () => {
  let component: DrawerControlsComponent;
  let fixture: ComponentFixture<DrawerControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawerControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
