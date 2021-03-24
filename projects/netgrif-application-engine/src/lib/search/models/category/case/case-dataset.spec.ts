import {CaseDataset} from './case-dataset';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {waitForAsync} from '@angular/core/testing';

describe('CaseDataset', () => {
    it('should create an instance',  waitForAsync(async () => {
        const opService = await new OperatorService();
        expect(new CaseDataset(opService, null, createMockDependencies())).toBeTruthy();
    }));
});
