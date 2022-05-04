import {LessThanDateTime} from './less-than-date-time';
import {OperatorService} from '../../operator-service/operator.service';
import {OperatorResolverService} from '../../operator-service/operator-resolver.service';
import {TestBed} from '@angular/core/testing';

describe('LessThanDateTime', () => {
    it('should create an instance', () => {
        expect(new LessThanDateTime(new OperatorService(new OperatorResolverService()))).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
