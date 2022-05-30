import {CaseAuthor} from './case-author';
import {OperatorService} from '../../../operator-service/operator.service';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';
import {Equals} from '../../operator/equals';
import {Categories} from '../categories';
import {Operators} from '../../operator/operators';
import {configureCategory} from '../../../../utility/tests/utility/configure-category';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {mockUserAutocompleteValue} from '../../../../utility/tests/mocks/mock-user-autocomplete-value';
import {TestBed} from '@angular/core/testing';

describe('CaseAuthor', () => {
    let category: CaseAuthor;
    let operatorService: OperatorService;

    beforeEach(() => {
        operatorService = new OperatorService(new OperatorResolverService());
        category = new CaseAuthor(operatorService, null, createMockDependencies(undefined, operatorService));
    });

    afterEach(() => {
        category.destroy();
        TestBed.resetTestingModule();
    });

    it('should create an instance', () => {
        expect(category).toBeTruthy();
    });

    it('should select default operator', () => {
        expect(category.isOperatorSelected()).toBeFalse();
        category.selectDefaultOperator();
        expect(category.isOperatorSelected()).toBeTrue();
    });

    it('should not serialize incomplete instance', () => {
        expect(category.createMetadata()).toBeUndefined();
    });

    it('should serialize complete instance', () => {
        configureCategory(category, operatorService, Equals, [mockUserAutocompleteValue('Test User', true, 'userId')]);

        const mockedSerializedValue = mockUserAutocompleteValue('Test User', true, 'userId');
        delete mockedSerializedValue.icon;

        const metadata = category.createMetadata();
        expect(metadata).toBeTruthy();
        expect(metadata.values).toEqual([mockedSerializedValue]);
        expect(metadata.category).toBe(Categories.CASE_AUTHOR);
        expect(metadata.configuration?.operator).toBe(Operators.EQUALS);
    });

    it('should deserialize stored instance', (done) => {
        configureCategory(category, operatorService, Equals, [mockUserAutocompleteValue('Test User', true, 'userId')]);

        const metadata = category.createMetadata();
        expect(metadata).toBeTruthy();
        const deserialized = new CaseAuthor(operatorService, null, createMockDependencies(undefined, operatorService));
        deserialized.loadFromMetadata(metadata).subscribe(() => {
            expect(deserialized.isOperatorSelected()).toBeTrue();
            expect(deserialized.providesPredicate).toBeTrue();

            expect((deserialized as any)._operandsFormControls[0].value).toEqual((category as any)._operandsFormControls[0].value);

            const deserializedMetadata = deserialized.createMetadata();
            expect(deserializedMetadata).toBeTruthy();
            expect(deserializedMetadata.configuration).toEqual(metadata.configuration);
            expect(deserializedMetadata.category).toEqual(metadata.category);
            expect(deserializedMetadata.values).toEqual(metadata.values);

            done();
        });
    });
});
