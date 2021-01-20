import {MoreThanDateTime} from './more-than-date-time';
import {OperatorService} from '../../operator-service/operator.service';

describe('MoreThanDateTime', () => {
    it('should create an instance', () => {
        expect(new MoreThanDateTime(new OperatorService())).toBeTruthy();
    });
});
