import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningSnackBarComponent } from './warning-snack-bar.component';

describe('WarningSnackBarComponent', () => {
  let component: WarningSnackBarComponent;
  let fixture: ComponentFixture<WarningSnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningSnackBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
