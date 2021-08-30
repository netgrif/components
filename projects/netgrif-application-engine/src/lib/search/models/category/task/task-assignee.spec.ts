import {TaskAssignee} from './task-assignee';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {waitForAsync} from '@angular/core/testing';
import {ReplaySubject} from 'rxjs';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';
import {Net} from '../../../../process/net';
import {configureCategory} from '../../../../utility/tests/utility/configure-category';
import {Equals} from '../../operator/equals';
import {Categories} from '../categories';
import {Operators} from '../../operator/operators';
import {mockUserAutocompleteValue} from '../../../../utility/tests/mocks/mock-user-autocomplete-value';

describe('TaskAssignee', () => {
    let operatorService: OperatorService;
    let category: TaskAssignee;
    let allowedNets$: ReplaySubject<Array<Net>>;

    beforeAll(() => {
        operatorService = new OperatorService(new OperatorResolverService());
    });

    beforeEach(waitForAsync(async () => {
        allowedNets$ = new ReplaySubject<Array<Net>>(1);
        allowedNets$.next([]);
        category = await new TaskAssignee(operatorService, null, createMockDependencies(allowedNets$, operatorService));
    }));

    afterEach(() => {
        allowedNets$.complete();
        category.destroy();
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
        expect(metadata.category).toBe(Categories.TASK_ASSIGNEE);
        expect(metadata.configuration?.operator).toBe(Operators.EQUALS);
    });

    it('should deserialize stored instance', (done) => {
        configureCategory(category, operatorService, Equals, [mockUserAutocompleteValue('Test User', true, 'userId')]);

        const metadata = category.createMetadata();
        expect(metadata).toBeTruthy();
        const deserialized = new TaskAssignee(operatorService, null, createMockDependencies(allowedNets$, operatorService));
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
