import {CaseTask} from './case-task';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';

describe('CaseTask', () => {
    it('should create an instance', () => {
        const opService = new OperatorService();
        expect(new CaseTask(opService, null, createMockDependencies())).toBeTruthy();
    });
});
