import {TaskProcess} from './task-process';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {OperatorService} from '../../../operator-service/operator.service';

describe('TaskProcess', () => {
    it('should create an instance', () => {
        const opService = new OperatorService();
        expect(new TaskProcess(opService, null, createMockDependencies())).toBeTruthy();
    });
});
