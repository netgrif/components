import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleRedirectComponent } from './example-redirect.component';

describe('RedirectComponent', () => {
  let component: ExampleRedirectComponent;
  let fixture: ComponentFixture<ExampleRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleRedirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
