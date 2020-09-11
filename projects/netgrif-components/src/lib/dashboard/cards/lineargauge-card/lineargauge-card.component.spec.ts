import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineargaugeCardComponent } from './lineargauge-card.component';

describe('LineargaugeCardComponent', () => {
  let component: LineargaugeCardComponent;
  let fixture: ComponentFixture<LineargaugeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineargaugeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineargaugeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
