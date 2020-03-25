import { TestBed } from '@angular/core/testing';
import { DialogService } from './dialog.service';
import {MatDialog, MatDialogModule} from '@angular/material';

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [MatDialogModule],
        providers: [MatDialog]
    });
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
