import {LessThanEqualDate} from './less-than-equal-date';
import {OperatorService} from '../../operator-service/operator.service';
import {OperatorResolverService} from '../../operator-service/operator-resolver.service';
import {TestBed} from '@angular/core/testing';

describe('LessThanEqualDate', () => {
    it('should create an instance', () => {
        expect(new LessThanEqualDate(new OperatorService(new OperatorResolverService()))).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
