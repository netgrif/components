import { TestBed } from '@angular/core/testing';

import { UserFieldService } from './user-field.service';
import {MaterialModule} from '../../../material/material.module';
import {MatSnackBar} from '@angular/material';

describe('UserFieldService', () => {
  let service: UserFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [MaterialModule],
        providers: [MatSnackBar, UserFieldService]
    });
    service = TestBed.inject(UserFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
