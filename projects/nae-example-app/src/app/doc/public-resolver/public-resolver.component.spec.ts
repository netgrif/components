import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicResolvercomponent } from './public-resolver.component';

describe('PublicResolverComponent', () => {
  let component: PublicResolvercomponent;
  let fixture: ComponentFixture<PublicResolvercomponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicResolvercomponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicResolvercomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
