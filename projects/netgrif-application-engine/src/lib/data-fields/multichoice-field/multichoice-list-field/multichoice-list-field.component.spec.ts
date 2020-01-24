import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultichoiceListFieldComponent } from './multichoice-list-field.component';

describe('MultichoiceListFieldComponent', () => {
  let component: MultichoiceListFieldComponent;
  let fixture: ComponentFixture<MultichoiceListFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultichoiceListFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultichoiceListFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
