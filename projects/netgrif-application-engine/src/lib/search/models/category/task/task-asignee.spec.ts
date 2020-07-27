import {TaskAssignee} from './task-assignee';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';

describe('TaskAsignee', () => {
    it('should create an instance', () => {
        const opService = new OperatorService();
        expect(new TaskAssignee(opService, null, createMockDependencies())).toBeTruthy();
    });
});
