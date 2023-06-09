import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportNetDialogComponent } from './import-net-dialog.component';

describe('ImportNetDialogComponent', () => {
  let component: ImportNetDialogComponent;
  let fixture: ComponentFixture<ImportNetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportNetDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportNetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
