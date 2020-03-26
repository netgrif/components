import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutShortcutComponent } from './logout-shortcut.component';

describe('LogoutShortcutComponent', () => {
  let component: LogoutShortcutComponent;
  let fixture: ComponentFixture<LogoutShortcutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutShortcutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutShortcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
