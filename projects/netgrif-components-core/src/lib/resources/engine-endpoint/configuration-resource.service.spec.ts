import { TestBed } from '@angular/core/testing';

import { ConfigurationResourceService } from './configuration-resource.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient} from '@angular/common/http';

describe('ConfigurationResourceService', () => {
  let service: ConfigurationResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, NoopAnimationsModule],
        providers: [HttpClient]
    });
    service = TestBed.inject(ConfigurationResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
