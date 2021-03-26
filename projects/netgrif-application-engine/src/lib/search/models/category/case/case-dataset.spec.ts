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
import {CategoryGeneratorMetadata} from '../generator-metadata';
import {Operator} from '../../operator/operator';
import {Type} from '@angular/core';
import {DatafieldMapKey} from '../../datafield-map-key';

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

    describe('serialization / deserialization', () => {
        beforeEach(() => {
            const data = [
                {stringId: 'textField', title: 'title', type: 'text'},
                {stringId: 'numberField', title: 'title', type: 'number'},
                {stringId: 'booleanField', title: 'title', type: 'boolean'},
                {stringId: 'enumerationField', title: 'title', type: 'enumeration'},
                {stringId: 'enumeration_mapField', title: 'title', type: 'enumeration_map'},
                {stringId: 'multichoiceField', title: 'title', type: 'multichoice'},
                {stringId: 'multichoice_mapField', title: 'title', type: 'multichoice_map'},
                {stringId: 'fileField', title: 'title', type: 'file'},
                {stringId: 'fileListField', title: 'title', type: 'fileList'},
                {stringId: 'userListField', title: 'title', type: 'userList'},
            ];
            allowedNets$.next([
                createMockNet('', 'netIdentifier', '', undefined, undefined, data),
                createMockNet('', 'netIdentifier2', '', undefined, undefined, data)
            ]);
        });

        describe('should serialize', () => {
            it('text field search', (done) => {
                const v = 'value';
                serializationTest(done, category, Equals, 'text', v, (metadata) => {
                    expect(metadata.values).toEqual([v]);
                }, operatorService);
            });
            it('enumeration field search', (done) => {
                const v = 'value';
                serializationTest(done, category, Equals, 'enumeration', v, (metadata) => {
                    expect(metadata.values).toEqual([v]);
                }, operatorService);
            });
            it('enumeration_map field search', (done) => {
                const v = 'value';
                serializationTest(done, category, Equals, 'enumeration_map', v, (metadata) => {
                    expect(metadata.values).toEqual([v]);
                }, operatorService);
            });
            it('multichoice field search', (done) => {
                const v = 'value';
                serializationTest(done, category, Equals, 'multichoice', v, (metadata) => {
                    expect(metadata.values).toEqual([v]);
                }, operatorService);
            });
            it('multichoice_map field search', (done) => {
                const v = 'value';
                serializationTest(done, category, Equals, 'multichoice_map', v, (metadata) => {
                    expect(metadata.values).toEqual([v]);
                }, operatorService);
            });
            it('file field search', (done) => {
                const v = 'value';
                serializationTest(done, category, Equals, 'file', v, (metadata) => {
                    expect(metadata.values).toEqual([v]);
                }, operatorService);
            });
            it('fileList field search', (done) => {
                const v = 'value';
                serializationTest(done, category, Equals, 'fileList', v, (metadata) => {
                    expect(metadata.values).toEqual([v]);
                }, operatorService);
            });
            it('userList field search', (done) => {
                const v = 'value';
                serializationTest(done, category, Equals, 'userList', v, (metadata) => {
                    expect(metadata.values).toEqual([v]);
                }, operatorService);
            });
            it('number field search', (done) => {
                const v = 10;
                serializationTest(done, category, Equals, 'number', v, (metadata) => {
                    expect(metadata.values).toEqual([v]);
                }, operatorService);
            });
            it('boolean field search', (done) => {
                const v = true;
                serializationTest(done, category, Equals, 'boolean', v, (metadata) => {
                    expect(metadata.values).toEqual([v]);
                }, operatorService);
            });
        });
    });
});

function serializationTest(done: DoneFn,
                           category: CaseDataset,
                           operator: Type<Operator<any>>,
                           fieldType: string,
                           value: any,
                           valueExpectation: (metadata: CategoryGeneratorMetadata) => void,
                           operatorService: OperatorService) {
    category.configurationInputs$.pipe(take(1)).subscribe(inputs => {
        expect(inputs).toBeTruthy();
        expect(Array.isArray(inputs)).toBeTrue();
        expect(inputs.length).toBe(1);

        expect(category.hasSelectedDatafields).toBeFalse();
        expect(category.isOperatorSelected()).toBeFalse();
        inputs[0].filteredOptions$.pipe(filter(o => o.length > 0), take(1)).subscribe(options => {
            const option = options.find(o => {
                const key = DatafieldMapKey.parse(o.value as string);
                // for search purposes, enumeration and multichoice maps are equivalent to their simpler counterparts
                if (fieldType === 'enumeration_map') {
                    fieldType = 'enumeration';
                } else if (fieldType === 'multichoice_map') {
                    fieldType = 'multichoice';
                }
                return key.type === fieldType;
            });
            expect(option).toBeTruthy();

            category.selectDatafields(option.value as string, false);
            expect(category.hasSelectedDatafields).toBeTrue();
            expect(category.isOperatorSelected()).toBeFalse();

            configureCategory(category, operatorService, operator, [value]);
            expect(category.isOperatorSelected()).toBeTrue();

            const metadata = category.createMetadata();
            expect(metadata).toBeTruthy();
            valueExpectation(metadata);
            expect(metadata.category).toBe(Categories.CASE_DATASET);
            expect(metadata.configuration?.operator).toBe(operatorService.getOperator(operator).serialize());

            done();
        });
    });
}
