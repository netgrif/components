import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultichoiceSelectFieldComponent } from './multichoice-select-field.component';

describe('MultichoiceSelectFieldComponent', () => {
  let component: MultichoiceSelectFieldComponent;
  let fixture: ComponentFixture<MultichoiceSelectFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultichoiceSelectFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultichoiceSelectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
