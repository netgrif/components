import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFilterDialogComponent } from './save-filter-dialog.component';

describe('SaveFilterDialogComponent', () => {
  let component: SaveFilterDialogComponent;
  let fixture: ComponentFixture<SaveFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveFilterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
