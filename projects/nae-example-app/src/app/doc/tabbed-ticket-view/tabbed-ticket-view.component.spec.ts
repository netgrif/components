import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedTicketViewComponent } from './tabbed-ticket-view.component';

describe('TabbedTicketViewComponent', () => {
  let component: TabbedTicketViewComponent;
  let fixture: ComponentFixture<TabbedTicketViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabbedTicketViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabbedTicketViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
