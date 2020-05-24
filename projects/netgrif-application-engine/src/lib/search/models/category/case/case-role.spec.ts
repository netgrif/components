import {CaseRole} from './case-role';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';

describe('CaseRole', () => {
    it('should create an instance', () => {
        const opService = new OperatorService();
        expect(new CaseRole(opService, null, createMockDependencies())).toBeTruthy();
    });
});
