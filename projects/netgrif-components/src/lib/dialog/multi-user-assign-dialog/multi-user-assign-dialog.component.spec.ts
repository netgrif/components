import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiUserAssignDialogComponent } from './multi-user-assign-dialog.component';

describe('MultiUserAssignDialogComponent', () => {
  let component: MultiUserAssignDialogComponent;
  let fixture: ComponentFixture<MultiUserAssignDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiUserAssignDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiUserAssignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
