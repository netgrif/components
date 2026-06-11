import {HttpClientModule} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MaterialImportModule} from '../../material-import/material-import.module';

import {GridsterService} from './gridster.service';

describe('GridsterService', () => {
  let service: GridsterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        MaterialImportModule,
        MatDialogModule,
      ],
    });
    service = TestBed.inject(GridsterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
