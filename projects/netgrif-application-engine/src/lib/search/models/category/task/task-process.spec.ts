import {TaskProcess} from './task-process';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {OperatorService} from '../../../operator-service/operator.service';
import {waitForAsync} from '@angular/core/testing';

describe('TaskProcess', () => {
    let operatorService: OperatorService;
    let category: TaskProcess;

    beforeAll(() => {
        operatorService = new OperatorService();
    });

    beforeEach( waitForAsync(async () => {
        category = await new TaskProcess(operatorService, null, createMockDependencies());
    }));

    it('should create an instance', () => {
        expect(category).toBeTruthy();
    });

    it('should select default operator', () => {
        expect(category.selectDefaultOperator()).toBeUndefined();
    });

    it('should join operands correctly', () => {
        category.selectDefaultOperator();
        const predicate = category.generatePredicate([['a', 'b']]);
        expect(predicate).toBeTruthy();
        expect(predicate.query).toBeTruthy();
        expect(predicate.query.isEmpty).toBeFalse();
        expect(predicate.query.value).toContain('OR');
    });

    afterEach(() => {
        category.destroy();
    });
});
