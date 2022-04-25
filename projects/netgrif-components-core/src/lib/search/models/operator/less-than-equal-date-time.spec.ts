import {LessThanEqualDateTime} from './less-than-equal-date-time';
import {OperatorService} from '../../operator-service/operator.service';
import {OperatorResolverService} from '../../operator-service/operator-resolver.service';
import {TestBed} from '@angular/core/testing';

describe('LessThanEqualDateTime', () => {
    it('should create an instance', () => {
        expect(new LessThanEqualDateTime(new OperatorService(new OperatorResolverService()))).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
