import {CaseCreationDate} from './case-creation-date';
import {OperatorService} from '../../../operator-service/operator.service';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';

describe('CaseCreationDate', () => {
    it('should create an instance', () => {
        expect(new CaseCreationDate(new OperatorService(new OperatorResolverService()), null)).toBeTruthy();
    });
});
