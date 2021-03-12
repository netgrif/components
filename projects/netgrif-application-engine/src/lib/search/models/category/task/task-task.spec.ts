import {TaskTask} from './task-task';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {OperatorService} from '../../../operator-service/operator.service';
import {waitForAsync} from '@angular/core/testing';
import {of} from 'rxjs';

describe('TaskTask', () => {
    it('should create an instance', waitForAsync(() => {
        const opService = new OperatorService();
        expect(new TaskTask(opService, null, createMockDependencies(of([])))).toBeTruthy();
    }));
});
