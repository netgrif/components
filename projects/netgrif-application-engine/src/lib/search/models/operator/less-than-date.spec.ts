import {LessThanDate} from './less-than-date';
import {OperatorService} from '../../operator-service/operator.service';
import {OperatorResolverService} from '../../operator-service/operator-resolver.service';

describe('LessThanDate', () => {
    it('should create an instance', () => {
        expect(new LessThanDate(new OperatorService(new OperatorResolverService()))).toBeTruthy();
    });
});
