import {CaseTitle} from './case-title';
import {OperatorService} from '../../../operator-service/operator.service';

describe('CaseTitle', () => {
    it('should create an instance', () => {
        expect(new CaseTitle(new OperatorService(), null)).toBeTruthy();
    });
});
