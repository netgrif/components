import {TaskTask} from './task-task';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {OperatorService} from '../../../operator-service/operator.service';

describe('TaskTask', () => {
    it('should create an instance', () => {
        const opService = new OperatorService();
        expect(new TaskTask(opService, null, createMockDependencies())).toBeTruthy();
    });
});
