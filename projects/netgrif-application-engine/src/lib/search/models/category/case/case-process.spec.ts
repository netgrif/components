import {CaseProcess} from './case-process';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {waitForAsync} from '@angular/core/testing';

describe('CaseProcess', () => {
    it('should create an instance', waitForAsync(() => {
        const opService = new OperatorService();
        expect(new CaseProcess(opService, null, createMockDependencies())).toBeTruthy();
    }));
});
