import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiUserAssignListComponent } from './multi-user-assign-list.component';

describe('MultiUserAssignListComponent', () => {
  let component: MultiUserAssignListComponent;
  let fixture: ComponentFixture<MultiUserAssignListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiUserAssignListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiUserAssignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
