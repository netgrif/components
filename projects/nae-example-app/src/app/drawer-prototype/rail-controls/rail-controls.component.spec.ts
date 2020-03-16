import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RailControlsComponent } from './rail-controls.component';

describe('RailControlsComponent', () => {
  let component: RailControlsComponent;
  let fixture: ComponentFixture<RailControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RailControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RailControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
