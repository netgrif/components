import { TestBed } from '@angular/core/testing';

import { PetriNetResourceService } from './petri-net-resource.service';

describe('PetriNetResourceService', () => {
  let service: PetriNetResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetriNetResourceService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
