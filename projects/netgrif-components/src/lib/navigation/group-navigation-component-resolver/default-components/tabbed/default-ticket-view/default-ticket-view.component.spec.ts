import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultTicketViewComponent } from './default-ticket-view.component';

describe('DefaultTicketViewComponent', () => {
  let component: DefaultTicketViewComponent;
  let fixture: ComponentFixture<DefaultTicketViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultTicketViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultTicketViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
