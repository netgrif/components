import {CaseAuthor} from './case-author';
import {OperatorService} from '../../../operator-service/operator.service';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';

describe('CaseAuthor', () => {
    it('should create an instance', () => {
        expect(new CaseAuthor(new OperatorService(new OperatorResolverService()), null)).toBeTruthy();
    });
});
