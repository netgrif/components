import {NotEqualsDate} from './not-equals-date';
import {OperatorService} from '../../operator-service/operator.service';

describe('NotEqualsDate', () => {
    it('should create an instance', () => {
        expect(new NotEqualsDate(new OperatorService())).toBeTruthy();
    });
});
