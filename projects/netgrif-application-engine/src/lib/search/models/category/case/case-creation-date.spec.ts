import {CaseCreationDate} from './case-creation-date';
import {OperatorService} from '../../../operator-service/operator.service';

describe('CaseCreationDate', () => {
    it('should create an instance', () => {
        expect(new CaseCreationDate(new OperatorService(), null)).toBeTruthy();
    });
});
