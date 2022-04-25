import {MoreThanDateTime} from './more-than-date-time';
import {OperatorService} from '../../operator-service/operator.service';
import {OperatorResolverService} from '../../operator-service/operator-resolver.service';
import {TestBed} from '@angular/core/testing';

describe('MoreThanDateTime', () => {
    it('should create an instance', () => {
        expect(new MoreThanDateTime(new OperatorService(new OperatorResolverService()))).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
