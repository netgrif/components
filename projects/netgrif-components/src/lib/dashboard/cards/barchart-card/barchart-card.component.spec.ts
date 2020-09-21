import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarchartCardComponent } from './barchart-card.component';

describe('BarchartCardComponent', () => {
  let component: BarchartCardComponent;
  let fixture: ComponentFixture<BarchartCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarchartCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarchartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
