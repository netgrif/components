import {TestBed} from '@angular/core/testing';

import {UserAssignService} from './user-assign.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';

describe('UserAssignService', () => {
  let service: UserAssignService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
            TranslateLibModule
        ]
    }).compileComponents();
    service = TestBed.inject(UserAssignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
