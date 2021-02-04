import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RailExampleComponent } from './rail-example.component';

describe('RailControlsComponent', () => {
  let component: RailExampleComponent;
  let fixture: ComponentFixture<RailExampleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RailExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RailExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
