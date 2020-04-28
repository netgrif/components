import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericSnackBarComponent } from './generic-snack-bar.component';

describe('GenericSnackBarComponent', () => {
  let component: GenericSnackBarComponent;
  let fixture: ComponentFixture<GenericSnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericSnackBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
