import {TestBed} from '@angular/core/testing';
import {OperatorService} from './operator.service';
import {Equals} from '../models/operator/equals';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('OperatorService', () => {
    let service: OperatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(OperatorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should create operator', () => {
        expect(service).toBeTruthy();
        const serviceOperator = service.getOperator(Equals);
        expect(serviceOperator).toBeTruthy();
        expect(serviceOperator.constructor === Equals).toBeTrue();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
