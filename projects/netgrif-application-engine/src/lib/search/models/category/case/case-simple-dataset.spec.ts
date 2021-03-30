import {CaseSimpleDataset} from './case-simple-dataset';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {waitForAsync} from '@angular/core/testing';

describe('CaseSimpleDataset', () => {
    it('should create an instance', waitForAsync(async () => {
        const opService = await new OperatorService();
        expect(new CaseSimpleDataset(opService, null, createMockDependencies())).toBeTruthy();
    }));
});
