import {TestBed} from '@angular/core/testing';
import {ConfigTaskViewServiceFactory} from './config-task-view-service-factory';

describe('ConfigTaskViewServiceFactory', () => {
    let service: ConfigTaskViewServiceFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ConfigTaskViewServiceFactory);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
