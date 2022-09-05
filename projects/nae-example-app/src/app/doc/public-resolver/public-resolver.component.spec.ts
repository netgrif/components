import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicResolverComponent } from './public-resolver.component';

describe('PublicResolverComponent', () => {
  let component: PublicResolverComponent;
  let fixture: ComponentFixture<PublicResolverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicResolverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicResolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
