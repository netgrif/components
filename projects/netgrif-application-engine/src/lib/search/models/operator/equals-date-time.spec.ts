import {EqualsDateTime} from './equals-date-time';
import {OperatorService} from '../../operator-service/operator.service';

describe('EqualsDateTime', () => {
    it('should create an instance', () => {
        expect(new EqualsDateTime(new OperatorService())).toBeTruthy();
    });
});
