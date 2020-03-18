import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShowcaseComponent } from './user-showcase.component';

describe('UserShowcaseComponent', () => {
  let component: UserShowcaseComponent;
  let fixture: ComponentFixture<UserShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
