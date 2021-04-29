import {CaseCreationDate} from './case-creation-date';
import {OperatorService} from '../../../operator-service/operator.service';
import {waitForAsync} from '@angular/core/testing';

describe('CaseCreationDate', () => {
    it('should create an instance',  waitForAsync(async () => {
        expect(new CaseCreationDate(await new OperatorService(), null)).toBeTruthy();
    }));
});
