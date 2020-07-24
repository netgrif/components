import {CaseVisualId} from './case-visual-id';
import {OperatorService} from '../../../operator-service/operator.service';

describe('CaseVisualId', () => {
    it('should create an instance', () => {
        expect(new CaseVisualId(new OperatorService(), null)).toBeTruthy();
    });
});
