import {CaseAuthor} from './case-author';
import {OperatorService} from '../../../operator-service/operator.service';
import {waitForAsync} from '@angular/core/testing';

describe('CaseAuthor', () => {
    it('should create an instance',  waitForAsync(async () => {
        expect(new CaseAuthor( await new OperatorService(), null)).toBeTruthy();
    }));
});
