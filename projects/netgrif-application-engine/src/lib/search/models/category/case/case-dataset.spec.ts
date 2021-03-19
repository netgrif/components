import {CaseDataset} from './case-dataset';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {of} from 'rxjs';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';

describe('CaseDataset', () => {
    it('should create an instance', () => {
        const opService = new OperatorService(new OperatorResolverService());
        expect(new CaseDataset(opService, null, createMockDependencies(of([])))).toBeTruthy();
    });
});
