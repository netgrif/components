import {HttpClientModule} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {SimulationModeService} from './simulation-mode.service';

describe('SimulationModeService', () => {
  let service: SimulationModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatSnackBarModule,
      ],
    });
    service = TestBed.inject(SimulationModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
