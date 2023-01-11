import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiUserAssignComponent } from './multi-user-assign.component';

describe('MultiUserAssignComponent', () => {
  let component: MultiUserAssignComponent;
  let fixture: ComponentFixture<MultiUserAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiUserAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiUserAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
