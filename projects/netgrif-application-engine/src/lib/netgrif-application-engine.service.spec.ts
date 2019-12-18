import { TestBed } from '@angular/core/testing';

import { NetgrifApplicationEngineService } from './netgrif-application-engine.service';

describe('NetgrifApplicationEngineService', () => {
  let service: NetgrifApplicationEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetgrifApplicationEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
