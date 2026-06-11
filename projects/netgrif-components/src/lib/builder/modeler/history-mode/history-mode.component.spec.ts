import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HistoryModeComponent} from './history-mode.component';

describe('HistoryModeComponent', () => {
  let component: HistoryModeComponent;
  let fixture: ComponentFixture<HistoryModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
