import {CaseDataset} from './case-dataset';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {ReplaySubject} from 'rxjs';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';
import {Net} from '../../../../process/net';
import {waitForAsync} from '@angular/core/testing';
import {createMockNet} from '../../../../utility/tests/utility/create-mock-net';
import {filter, take} from 'rxjs/operators';
import {configureCategory} from '../../../../utility/tests/utility/configure-category';
import {Equals} from '../../operator/equals';
import {Categories} from '../categories';
import {Operators} from '../../operator/operators';

describe('CaseDataset', () => {
    let operatorService: OperatorService;
    let category: CaseDataset;
    let allowedNets$: ReplaySubject<Array<Net>>;

    beforeAll(() => {
        operatorService = new OperatorService(new OperatorResolverService());
    });

    beforeEach(waitForAsync(async () => {
        allowedNets$ = new ReplaySubject<Array<Net>>(1);
        category = await new CaseDataset(operatorService, null, createMockDependencies(allowedNets$, operatorService));
    }));

    afterEach(() => {
        allowedNets$.complete();
        category.destroy();
    });

    it('should create an instance', () => {
        allowedNets$.next([]);
        expect(category).toBeTruthy();
    });

    it('should generate options with unique name and type only', (done) => {
        allowedNets$.next([
            createMockNet('', 'netIdentifier', '', undefined, undefined, [
                {stringId: 'fieldId', title: 'title', type: 'text'},
                {stringId: 'fieldId2', title: 'title', type: 'number'}
            ]),
            createMockNet('', 'netIdentifier2', '', undefined, undefined, [
                {stringId: 'fieldId', title: 'title', type: 'text'}
            ])
        ]);
        category.configurationInputs$.pipe(take(1)).subscribe(inputs => {
            expect(inputs).toBeTruthy();
            expect(Array.isArray(inputs)).toBeTrue();
            expect(inputs.length).toBe(1);

            inputs[0].filteredOptions$.pipe(filter(o => o.length > 0), take(1)).subscribe(options => {
                expect(options.length).toBe(2);
                done();
            });
        });
    });

    it('should not serialize incomplete instance', () => {
        allowedNets$.next([]);
        expect(category.createMetadata()).toBeUndefined();
    });

    it('should serialize complete instance', (done) => {
        allowedNets$.next([
            createMockNet('', 'netIdentifier', '', undefined, undefined, [{stringId: 'fieldId', title: 'title', type: 'text'}]),
            createMockNet('', 'netIdentifier2', '', undefined, undefined, [{stringId: 'fieldId', title: 'title', type: 'text'}])
        ]);

        category.configurationInputs$.pipe(take(1)).subscribe(inputs => {
            expect(inputs).toBeTruthy();
            expect(Array.isArray(inputs)).toBeTrue();
            expect(inputs.length).toBe(1);

            expect(category.hasSelectedDatafields).toBeFalse();
            expect(category.isOperatorSelected()).toBeFalse();
            inputs[0].filteredOptions$.pipe(filter(o => o.length > 0), take(1)).subscribe(options => {
                expect(options.length).toBe(1);
                const option = options[0];

                category.selectDatafields(option.value as string, false);
                expect(category.hasSelectedDatafields).toBeTrue();
                expect(category.isOperatorSelected()).toBeFalse();

                configureCategory(category, operatorService, Equals, ['value']);
                expect(category.isOperatorSelected()).toBeTrue();

                const metadata = category.createMetadata();
                expect(metadata).toBeTruthy();
                expect(metadata.values).toEqual(['value']);
                expect(metadata.category).toBe(Categories.CASE_DATASET);
                expect(metadata.configuration?.operator).toBe(Operators.EQUALS);

                done();
            });
        });
    });
});
