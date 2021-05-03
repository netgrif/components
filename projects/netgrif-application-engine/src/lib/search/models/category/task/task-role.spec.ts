import {TaskRole} from './task-role';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {waitForAsync} from '@angular/core/testing';

describe('TaskRole', () => {
    it('should create an instance', waitForAsync(async () => {
        const opService = await new OperatorService();
        const taskRole = new TaskRole(opService, null, createMockDependencies());
        expect(taskRole).toBeTruthy();
        taskRole.destroy();
    }));
});
