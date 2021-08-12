import {EqualsDate} from './equals-date';
import {OperatorService} from '../../operator-service/operator.service';
import {OperatorResolverService} from '../../operator-service/operator-resolver.service';

describe('EqualsDate', () => {
    it('should create an instance', () => {
        expect(new EqualsDate(new OperatorService(new OperatorResolverService()))).toBeTruthy();
    });
});
