import { TestBed } from '@angular/core/testing';

import { PublicPetriNetResourceService } from './public-petri-net-resource.service';

describe('PublicPetriNetResourceService', () => {
  let service: PublicPetriNetResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicPetriNetResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
