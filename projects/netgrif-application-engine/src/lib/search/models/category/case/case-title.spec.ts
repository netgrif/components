import {CaseTitle} from './case-title';
import {OperatorService} from '../../../operator-service/operator.service';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';

describe('CaseTitle', () => {
    it('should create an instance', () => {
        expect(new CaseTitle(new OperatorService(new OperatorResolverService()), null)).toBeTruthy();
    });
});
