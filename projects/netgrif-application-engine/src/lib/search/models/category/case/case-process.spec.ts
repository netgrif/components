import {CaseProcess} from './case-process';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';

describe('CaseProcess', () => {
    it('should create an instance', () => {
        const opService = new OperatorService();
        expect(new CaseProcess(opService, null, createMockDependencies())).toBeTruthy();
    });
});
