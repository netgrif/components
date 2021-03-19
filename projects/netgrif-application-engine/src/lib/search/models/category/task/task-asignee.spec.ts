import {TaskAssignee} from './task-assignee';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {waitForAsync} from '@angular/core/testing';
import {of} from 'rxjs';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';

describe('TaskAsignee', () => {
    it('should create an instance', waitForAsync(() => {
        const opService = new OperatorService(new OperatorResolverService());
        expect(new TaskAssignee(opService, null, createMockDependencies(of([])))).toBeTruthy();
    }));
});
