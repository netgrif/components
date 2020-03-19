import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredLabelComponent } from './required-label.component';

describe('RequiredLabelComponent', () => {
  let component: RequiredLabelComponent;
  let fixture: ComponentFixture<RequiredLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequiredLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
