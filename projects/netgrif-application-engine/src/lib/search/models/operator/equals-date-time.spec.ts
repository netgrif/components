import {EqualsDateTime} from './equals-date-time';
import {OperatorService} from '../../operator-service/operator.service';
import {OperatorResolverService} from '../../operator-service/operator-resolver.service';

describe('EqualsDateTime', () => {
    it('should create an instance', () => {
        expect(new EqualsDateTime(new OperatorService(new OperatorResolverService()))).toBeTruthy();
    });
});
