import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultichoiceFieldComponent } from './multichoice-field.component';

describe('MultichoiceFieldComponent', () => {
  let component: MultichoiceFieldComponent;
  let fixture: ComponentFixture<MultichoiceFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultichoiceFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultichoiceFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
