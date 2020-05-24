import {TaskRole} from './task-role';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';

describe('TaskRole', () => {
    it('should create an instance', () => {
        const opService = new OperatorService();
        expect(new TaskRole(opService, null, createMockDependencies())).toBeTruthy();
    });
});
