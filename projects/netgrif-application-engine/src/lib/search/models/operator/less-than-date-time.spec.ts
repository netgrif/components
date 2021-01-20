import {LessThanDateTime} from './less-than-date-time';
import {OperatorService} from '../../operator-service/operator.service';

describe('LessThanDateTime', () => {
    it('should create an instance', () => {
        expect(new LessThanDateTime(new OperatorService())).toBeTruthy();
    });
});
