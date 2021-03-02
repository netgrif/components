import {TaskAssignee} from './task-assignee';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {waitForAsync} from '@angular/core/testing';

describe('TaskAsignee', () => {
    it('should create an instance', waitForAsync(async () => {
        const opService = await new OperatorService();
        expect(new TaskAssignee(opService, null, createMockDependencies())).toBeTruthy();
    }));
});
