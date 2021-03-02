import {CaseTitle} from './case-title';
import {OperatorService} from '../../../operator-service/operator.service';
import {waitForAsync} from '@angular/core/testing';

describe('CaseTitle', () => {
    it('should create an instance', waitForAsync(async () => {
        expect(new CaseTitle(await new OperatorService(), null)).toBeTruthy();
    }));
});
