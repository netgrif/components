import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractPanelComponent } from './abstract-panel.component';

describe('AbstractPanelComponent', () => {
  let component: AbstractPanelComponent;
  let fixture: ComponentFixture<AbstractPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
