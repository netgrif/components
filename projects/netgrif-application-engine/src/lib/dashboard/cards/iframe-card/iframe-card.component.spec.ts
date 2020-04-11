import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeCardComponent } from './iframe-card.component';

describe('IframeCardComponent', () => {
  let component: IframeCardComponent;
  let fixture: ComponentFixture<IframeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IframeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IframeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
