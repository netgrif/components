import { TestBed } from '@angular/core/testing';

import { SnackBarService } from './snack-bar.service';
import {MaterialModule} from '../../material/material.module';

describe('SnackBarService', () => {
  let service: SnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [MaterialModule]
    });
    service = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
