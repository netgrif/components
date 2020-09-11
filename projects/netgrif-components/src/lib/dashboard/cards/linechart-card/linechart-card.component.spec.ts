import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechartCardComponent } from './linechart-card.component';

describe('LinechartCardComponent', () => {
  let component: LinechartCardComponent;
  let fixture: ComponentFixture<LinechartCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinechartCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinechartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
