import {CaseTask} from './case-task';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {waitForAsync} from '@angular/core/testing';
import {of} from 'rxjs';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';

describe('CaseTask', () => {
    it('should create an instance', waitForAsync(() => {
        const opService = new OperatorService(new OperatorResolverService());
        expect(new CaseTask(opService, null, createMockDependencies(of([])))).toBeTruthy();
    }));
});
