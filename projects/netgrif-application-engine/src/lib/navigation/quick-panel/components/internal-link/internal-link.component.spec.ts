import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalLinkComponent } from './internal-link.component';

describe('InternalLinkComponent', () => {
  let component: InternalLinkComponent;
  let fixture: ComponentFixture<InternalLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
