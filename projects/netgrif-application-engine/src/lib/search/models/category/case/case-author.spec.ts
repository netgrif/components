import {CaseAuthor} from './case-author';
import {OperatorService} from '../../../operator-service/operator.service';

describe('CaseAuthor', () => {
    it('should create an instance', () => {
        expect(new CaseAuthor(new OperatorService(), null)).toBeTruthy();
    });
});
