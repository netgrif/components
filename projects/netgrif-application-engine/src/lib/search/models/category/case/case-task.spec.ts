import {CaseTask} from './case-task';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {waitForAsync} from '@angular/core/testing';
import {of} from 'rxjs';

describe('CaseTask', () => {
    it('should create an instance', waitForAsync(() => {
        const opService = new OperatorService();
        expect(new CaseTask(opService, null, createMockDependencies(of([])))).toBeTruthy();
    }));
});
