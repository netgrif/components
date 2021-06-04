import {NotEquals} from './not-equals';
import {OperatorService} from '../../operator-service/operator.service';
import {OperatorResolverService} from '../../operator-service/operator-resolver.service';

describe('NotEquals', () => {
    it('should create an instance', () => {
        expect(new NotEquals(new OperatorService(new OperatorResolverService()))).toBeTruthy();
    });
});
