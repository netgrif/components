import {MoreThanEqualDate} from './more-than-equal-date';
import {OperatorService} from '../../operator-service/operator.service';
import {OperatorResolverService} from '../../operator-service/operator-resolver.service';
import {TestBed} from '@angular/core/testing';

describe('MoreThanEqualDate', () => {
    it('should create an instance', () => {
        expect(new MoreThanEqualDate(new OperatorService(new OperatorResolverService()))).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
