import {EqualsDate} from './equals-date';
import {OperatorService} from '../../operator-service/operator.service';

describe('EqualsDate', () => {
    it('should create an instance', () => {
        expect(new EqualsDate(new OperatorService())).toBeTruthy();
    });
});
