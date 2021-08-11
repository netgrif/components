import {NotEqualsDate} from './not-equals-date';
import {OperatorService} from '../../operator-service/operator.service';
import {OperatorResolverService} from '../../operator-service/operator-resolver.service';

describe('NotEqualsDate', () => {
    it('should create an instance', () => {
        expect(new NotEqualsDate(new OperatorService(new OperatorResolverService()))).toBeTruthy();
    });
});
