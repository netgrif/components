import {CaseSimpleDataset} from './case-simple-dataset';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {of} from 'rxjs';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';
import {createMockNet} from '../../../../utility/tests/utility/create-mock-net';
import {TestBed} from '@angular/core/testing';

describe('CaseSimpleDataset', () => {
    let category: CaseSimpleDataset;
    let operatorService: OperatorService;

    beforeEach(() => {
        operatorService = new OperatorService(new OperatorResolverService());
        category = new CaseSimpleDataset(operatorService, null, createMockDependencies(of([
            createMockNet('', 'netIdentifier', '', undefined, undefined, [{stringId: 'fieldId', title: 'title', type: 'text'}])
        ]), operatorService));
    });

    afterEach(() => {
        category.destroy();
        TestBed.resetTestingModule();
    });

    it('should create an instance', () => {
        expect(category).toBeTruthy();
    });

    it('configured category should create query', () => {
        category.configure('fieldId', 'text', ['netIdentifier']);
        const predicate = category.generatePredicate(['text']);
        expect(predicate).toBeTruthy();
        expect(predicate.query).toBeTruthy();
        expect(predicate.query.isEmpty).toBeFalse();
    });

    it('configured category should be able to convert into CaseDataset', () => {
        category.configure('fieldId', 'text', ['netIdentifier']);
        const predicate = category.generatePredicate(['text']);
        const caseDataset = category.transformToCaseDataset('text', 'title', ['text']);
        expect(caseDataset.hasSelectedDatafields).toBeTrue();
        expect(caseDataset.isOperatorSelected()).toBeTrue();
        expect(caseDataset.providesPredicate).toBeTrue();
        const datasetPredicate = caseDataset.generatedPredicate;
        expect(datasetPredicate).toBeTruthy();
        expect(datasetPredicate.query).toBeTruthy();
        expect(datasetPredicate.query.isEmpty).toBeFalse();
        expect(datasetPredicate.query.value).toBe(predicate.query.value);
    });
});
