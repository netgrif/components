import {TaskRole} from './task-role';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {TestBed, waitForAsync} from '@angular/core/testing';
import {ReplaySubject} from 'rxjs';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';
import {Net} from '../../../../process/net';
import {createMockNet} from '../../../../utility/tests/utility/create-mock-net';
import {configureCategory} from '../../../../utility/tests/utility/configure-category';
import {Equals} from '../../operator/equals';
import {Categories} from '../categories';
import {Operators} from '../../operator/operators';
import {filter, take} from 'rxjs/operators';

describe('TaskRole', () => {
    let operatorService: OperatorService;
    let category: TaskRole;
    let allowedNets$: ReplaySubject<Array<Net>>;

    beforeAll(() => {
        operatorService = new OperatorService(new OperatorResolverService());
    });

    beforeEach(waitForAsync(async () => {
        allowedNets$ = new ReplaySubject<Array<Net>>(1);
        category = await new TaskRole(operatorService, null, createMockDependencies(allowedNets$, operatorService));
    }));

    afterEach(() => {
        allowedNets$.complete();
        category.destroy();
        TestBed.resetTestingModule();
    });

    it('should create an instance', () => {
        allowedNets$.next([]);
        expect(category).toBeTruthy();
    });

    it('should select default operator', () => {
        allowedNets$.next([]);
        expect(category.isOperatorSelected()).toBeFalse();
        category.selectDefaultOperator();
        expect(category.isOperatorSelected()).toBeTrue();
    });

    it('should generate options with unique names only', () => {
        allowedNets$.next([
            createMockNet('', 'A', 'A', [{name: 'role1', stringId: 'sid1'}, {name: 'role2', stringId: 'sid2'}]),
            createMockNet('', 'B', 'B', [{name: 'role2', stringId: 'sid3'}]),
        ]);
        category.selectDefaultOperator();

        const options = category.options;
        expect(options).toBeTruthy();
        expect(Array.isArray(options)).toBeTrue();
        expect(options.length).toBe(2);

        const option1 = options.find(o => o.text === 'role1');
        const option2 = options.find(o => o.text === 'role2');

        expect(option1).toBeTruthy();
        expect(option1.value).toBeTruthy();
        expect(Array.isArray(option1.value)).toBeTrue();
        expect(option1.value.length).toBe(1);
        expect(option1.value[0].attributeId).toBe('sid1');

        expect(option2).toBeTruthy();
        expect(option2.value).toBeTruthy();
        expect(Array.isArray(option2.value)).toBeTrue();
        expect(option2.value.length).toBe(2);
        expect(option2.value.some(o => o.attributeId === 'sid2')).toBeTrue();
        expect(option2.value.some(o => o.attributeId === 'sid3')).toBeTrue();
    });

    it('should not serialize incomplete instance', () => {
        allowedNets$.next([]);
        expect(category.createMetadata()).toBeUndefined();
    });

    it('should serialize complete instance', () => {
        allowedNets$.next([
            createMockNet('', 'A', 'A', [{name: 'role1', stringId: 'sid1'}]),
            createMockNet('', 'B', 'B', [{name: 'role1', stringId: 'sid2'}]),
        ]);

        const options = category.options;
        expect(options.length).toBe(1);
        const option = options[0];
        expect(option.text).toBe('role1');

        configureCategory(category, operatorService, Equals, [option]);

        const metadata = category.createMetadata();
        expect(metadata).toBeTruthy();
        expect(metadata.values).toEqual([option.text]);
        expect(metadata.category).toBe(Categories.TASK_ROLE);
        expect(metadata.configuration?.operator).toBe(Operators.EQUALS);
    });

    it('should deserialize stored instance', (done) => {
        allowedNets$.next([
            createMockNet('', 'A', 'A', [{name: 'role1', stringId: 'sid1'}]),
            createMockNet('', 'B', 'B', [{name: 'role1', stringId: 'sid2'}]),
        ]);

        const options = category.options;
        expect(options.length).toBe(1);
        const option = options[0];
        expect(option.text).toBe('role1');

        configureCategory(category, operatorService, Equals, [option]);

        const metadata = category.createMetadata();
        expect(metadata).toBeTruthy();
        const deserialized = new TaskRole(operatorService, null, createMockDependencies(allowedNets$, operatorService));

        // wait for autocomplete options to initialize
        deserialized.options$.pipe(filter(o => o.length > 0), take(1)).subscribe(() => {
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
});
