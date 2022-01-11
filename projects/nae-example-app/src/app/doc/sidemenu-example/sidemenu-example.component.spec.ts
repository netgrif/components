import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemenuExampleComponent } from './sidemenu-example.component';

describe('SidemenuExampleComponent', () => {
  let component: SidemenuExampleComponent;
  let fixture: ComponentFixture<SidemenuExampleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SidemenuExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidemenuExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
