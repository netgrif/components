import {CaseTask} from './case-task';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {waitForAsync} from '@angular/core/testing';

describe('CaseTask', () => {
    it('should create an instance', waitForAsync(async () => {
        const opService = await new OperatorService();
        expect(new CaseTask(opService, null, createMockDependencies())).toBeTruthy();
    }));
});
