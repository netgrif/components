import {LessThanDate} from './less-than-date';
import {OperatorService} from '../../operator-service/operator.service';

describe('LessThanDate', () => {
    it('should create an instance', () => {
        expect(new LessThanDate(new OperatorService())).toBeTruthy();
    });
});
