import {CaseProcess} from './case-process';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {waitForAsync} from '@angular/core/testing';

describe('CaseProcess', () => {
    let operatorService: OperatorService;
    let category: CaseProcess;

    beforeAll(() => {
        operatorService = new OperatorService();
    });

    beforeEach(() => {
        category = new CaseProcess(operatorService, null, createMockDependencies());
    });

    it('should create an instance', waitForAsync(() => {
        expect(category).toBeTruthy();
    }));

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
});
