import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiUserAssignItemComponent } from './multi-user-assign-item.component';

describe('MultiUserAssignItemComponent', () => {
  let component: MultiUserAssignItemComponent;
  let fixture: ComponentFixture<MultiUserAssignItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiUserAssignItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiUserAssignItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
