import {CaseSimpleDataset} from './case-simple-dataset';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {of} from 'rxjs';

describe('CaseSimpleDataset', () => {
    it('should create an instance', () => {
        const opService = new OperatorService();
        expect(new CaseSimpleDataset(opService, null, createMockDependencies(of([])))).toBeTruthy();
    });
});
