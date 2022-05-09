import { TestBed } from '@angular/core/testing';

import {Injectable} from '@angular/core';
import {LoadingEmitter} from '../../../utility/loading-emitter';
import {PublicTaskLoadingService} from './public-task-loading.service';

describe('PublicTaskLoadingService', () => {
  let service: TestPublicTaskLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [TestPublicTaskLoadingService]
    });
    service = TestBed.inject(TestPublicTaskLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set value', () => {
        service.setLoading$(true);
        expect(service.getEmitter().isActive).toBeTrue();
  });

  it('should get value', () => {
        const loading = service.getEmitter().asObservable();
        expect(service.loading$).toEqual(loading);
    });
});

@Injectable()
class TestPublicTaskLoadingService extends PublicTaskLoadingService {
    constructor() {
        super();
    }

    public getEmitter(): LoadingEmitter {
        return this._loading$;
    }
}
