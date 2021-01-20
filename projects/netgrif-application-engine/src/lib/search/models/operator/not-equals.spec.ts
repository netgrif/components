import {NotEquals} from './not-equals';
import {OperatorService} from '../../operator-service/operator.service';

describe('NotEquals', () => {
    it('should create an instance', () => {
        expect(new NotEquals(new OperatorService())).toBeTruthy();
    });
});
