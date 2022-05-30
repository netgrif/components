import {TestBed} from '@angular/core/testing';
import {OperatorService} from './operator.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Equals} from '../models/operator/equals';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('OperatorService', () => {
    let service: OperatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, HttpClientTestingModule]
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
