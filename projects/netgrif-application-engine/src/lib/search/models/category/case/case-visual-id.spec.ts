import {CaseVisualId} from './case-visual-id';
import {OperatorService} from '../../../operator-service/operator.service';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';

describe('CaseVisualId', () => {
    it('should create an instance', () => {
        expect(new CaseVisualId(new OperatorService(new OperatorResolverService()), null)).toBeTruthy();
    });
});
