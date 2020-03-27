import {TestBed} from '@angular/core/testing';

import {ResourceProvider} from './resource-provider.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ResourceProviderService', () => {
  let service: ResourceProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ HttpClient]
    });
    service = TestBed.inject(ResourceProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
