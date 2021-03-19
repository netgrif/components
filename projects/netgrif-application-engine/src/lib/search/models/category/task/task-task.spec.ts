import {TaskTask} from './task-task';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {OperatorService} from '../../../operator-service/operator.service';
import {waitForAsync} from '@angular/core/testing';
import {of} from 'rxjs';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';

describe('TaskTask', () => {
    it('should create an instance', waitForAsync(() => {
        const opService = new OperatorService(new OperatorResolverService());
        expect(new TaskTask(opService, null, createMockDependencies(of([])))).toBeTruthy();
    }));
});
