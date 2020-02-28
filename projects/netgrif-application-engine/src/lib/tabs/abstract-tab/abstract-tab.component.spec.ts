import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractTabComponent } from './abstract-tab.component';

describe('AbstractTabComponent', () => {
  let component: AbstractTabComponent;
  let fixture: ComponentFixture<AbstractTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
