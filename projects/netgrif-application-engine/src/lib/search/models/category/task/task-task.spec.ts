import {TaskTask} from './task-task';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {OperatorService} from '../../../operator-service/operator.service';
import {waitForAsync} from '@angular/core/testing';

describe('TaskTask', () => {
    it('should create an instance', waitForAsync(async () => {
        const opService = await new OperatorService();
        const taskTask = new TaskTask(opService, null, createMockDependencies());
        expect(taskTask).toBeTruthy();
        taskTask.destroy();
    }));
});
