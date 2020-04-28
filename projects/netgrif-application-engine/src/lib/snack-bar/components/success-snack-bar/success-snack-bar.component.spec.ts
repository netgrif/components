import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessSnackBarComponent } from './success-snack-bar.component';

describe('SuccessSnackBarComponent', () => {
  let component: SuccessSnackBarComponent;
  let fixture: ComponentFixture<SuccessSnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessSnackBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
