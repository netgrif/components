import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationDoubleDrawerComponent } from './navigation-double-drawer.component';

describe('NavigationDoubleDrawerComponent', () => {
  let component: NavigationDoubleDrawerComponent;
  let fixture: ComponentFixture<NavigationDoubleDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationDoubleDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationDoubleDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
