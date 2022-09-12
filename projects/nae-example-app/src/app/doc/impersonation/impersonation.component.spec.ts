import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpersonationComponent } from './impersonation.component';

describe('ImpersonationComponent', () => {
  let component: ImpersonationComponent;
  let fixture: ComponentFixture<ImpersonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpersonationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpersonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
