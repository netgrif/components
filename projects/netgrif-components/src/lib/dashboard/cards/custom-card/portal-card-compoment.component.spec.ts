import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalCardCompoment } from './portal-card-compoment.component';

describe('CustomCardComponent', () => {
  let component: PortalCardCompoment;
  let fixture: ComponentFixture<PortalCardCompoment>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalCardCompoment ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalCardCompoment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
