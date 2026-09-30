import {CaseDataset} from './case-dataset';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {Observable, ReplaySubject} from 'rxjs';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';
import {Net} from '../../../../process/net';
import {TestBed, waitForAsync} from '@angular/core/testing';
import {createMockNet} from '../../../../utility/tests/utility/create-mock-net';
import {filter, take} from 'rxjs/operators';
import {configureCategory} from '../../../../utility/tests/utility/configure-category';
import {Equals} from '../../operator/equals';
import {Operator} from '../../operator/operator';
import {Type} from '@angular/core';
import {DatafieldMapKey} from '../../datafield-map-key';
import {SearchAutocompleteOption} from '../search-autocomplete-option';
import moment from 'moment';
import {EqualsDate} from '../../operator/equals-date';
import {EqualsDateTime} from '../../operator/equals-date-time';
import {DataSimpleExpression} from "../../../../pfql/model/data-simple-expression";

describe('CaseDataset', () => {
    let operatorService: OperatorService;
    let category: CaseDataset;
    let allowedNets$: ReplaySubject<Array<Net>>;

    beforeAll(() => {
        operatorService = new OperatorService(new OperatorResolverService());
    });

    beforeEach(waitForAsync(async () => {
        allowedNets$ = new ReplaySubject<Array<Net>>(1);
        category = new CaseDataset(operatorService, null, createMockDependencies(allowedNets$, operatorService));
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

    describe('loading from pfql', () => {
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
                {stringId: 'userField', title: 'title', type: 'user'},
                {stringId: 'dateField', title: 'title', type: 'date'},
                {stringId: 'dateTimeField', title: 'title', type: 'dateTime'},
            ];
            allowedNets$.next([
                createMockNet('', 'netIdentifier', '', undefined, undefined, data),
                createMockNet('', 'netIdentifier2', '', undefined, undefined, data)
            ]);
        });
        afterEach(() => {
            allowedNets$.complete();
            category.destroy();
            TestBed.resetTestingModule();
        });

        describe('should load from pfql', () => {
            it('text field search', (done) => {
                const v = 'value';
                loadFromPfqlTest(done, category, Equals, 'text', 'textField', v, (d, c) => valueObjectsComparison(d, c),
                    operatorService, allowedNets$);
            });
            it('enumeration field search', (done) => {
                const v = 'value';
                loadFromPfqlTest(done, category, Equals, 'enumeration', 'enumerationField', v, (d, c) => valueObjectsComparison(d, c),
                    operatorService, allowedNets$);
            });
            it('enumeration_map field search', (done) => {
                const v = 'value';
                loadFromPfqlTest(done, category, Equals, 'enumeration_map', 'enumeration_mapField', v, (d, c) => valueObjectsComparison(d, c),
                    operatorService, allowedNets$);
            });
            it('multichoice field search', (done) => {
                const v = 'value';
                loadFromPfqlTest(done, category, Equals, 'multichoice', 'multichoiceField', v, (d, c) => valueObjectsComparison(d, c),
                    operatorService, allowedNets$);
            });
            it('multichoice_map field search', (done) => {
                const v = 'value';
                loadFromPfqlTest(done, category, Equals, 'multichoice_map', 'multichoice_mapField', v, (d, c) => valueObjectsComparison(d, c),
                    operatorService, allowedNets$);
            });
            it('file field search', (done) => {
                const v = 'value';
                loadFromPfqlTest(done, category, Equals, 'file', 'fileField', v, (d, c) => valueObjectsComparison(d, c),
                    operatorService, allowedNets$);
            });
            it('fileList field search', (done) => {
                const v = 'value';
                loadFromPfqlTest(done, category, Equals, 'fileList', 'fileListField', v, (d, c) => valueObjectsComparison(d, c),
                    operatorService, allowedNets$);
            });
            it('userList field search', (done) => {
                const v = 'value';
                loadFromPfqlTest(done, category, Equals, 'userList', 'userListField', v, (d, c) => valueObjectsComparison(d, c),
                    operatorService, allowedNets$);
            });
            it('number field search', (done) => {
                const v = 10;
                loadFromPfqlTest(done, category, Equals, 'number', 'numberField', v, (d, c) => valueObjectsComparison(d, c),
                    operatorService, allowedNets$);
            });
            it('boolean field search', (done) => {
                const v = true;
                loadFromPfqlTest(done, category, Equals, 'boolean', 'booleanField', v, (d, c) => valueObjectsComparison(d, c),
                    operatorService, allowedNets$);
            });
            it('user field search', (done) => {
                const v = mockUserSearchValue('Test User', '7');
                loadFromPfqlTest(done, category, Equals, 'user', 'userField', v, (d, c) => valueObjectsComparison(d, c),
                    operatorService, allowedNets$);
            });
            it('date field search', (done) => {
                const v = moment('2021-03-30');
                loadFromPfqlTest(done, category, EqualsDate, 'date', 'dateField', v, (d, c) => momentObjectsComparison(d, c),
                    operatorService, allowedNets$);
            });
            it('dateTime field search', (done) => {
                const v = moment('2021-03-30 10:39');
                loadFromPfqlTest(done, category, EqualsDateTime, 'dateTime', 'dateTimeField', v, (d, c) => momentObjectsComparison(d, c),
                    operatorService, allowedNets$);
            });
            afterEach(() => {
                allowedNets$.complete();
                category.destroy();
                TestBed.resetTestingModule();
            });
        });
    });
});

function loadFromPfqlTest(done: DoneFn,
                             category: CaseDataset,
                             operator: Type<Operator<any>>,
                             fieldType: string,
                             fieldIdentifier,
                             value: any,
                             expectLoadedValueToBeEqual: (loadingCategory: any, category: any) => void,
                             operatorService: OperatorService,
                             allowedNets$: Observable<Array<Net>>) {
    category.configurationInputs$.pipe(take(1)).subscribe(inputs => {
        expect(inputs).toBeTruthy();
        expect(Array.isArray(inputs)).toBeTrue();
        expect(inputs.length).toBe(1);

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
            configureCategory(category, operatorService, operator, [value]);

            const loadedCategory = new CaseDataset(operatorService, null, createMockDependencies(allowedNets$, operatorService));
            const expression = new DataSimpleExpression(fieldIdentifier, operatorService.getOperator(operator), value, category);
            loadedCategory.loadFromPfqlExpression(expression).subscribe(() => {
                expect(loadedCategory.hasSelectedDatafields).toBeTrue();
                expect(loadedCategory.isOperatorSelected()).toBeTrue();
                expect(loadedCategory.providesPredicate).toBeTrue();

                expectLoadedValueToBeEqual(loadedCategory, category);

                done();
            });
        });
    });
}

function valueObjectsComparison(loadedCategory: any, category: any) {
    expect(loadedCategory._operandsFormControls[0].value).toEqual(category._operandsFormControls[0].value);
}

function momentObjectsComparison(loadedCategory: any, category: any) {
    const originalMoment = (category as any)._operandsFormControls[0].value;
    const loadedMoment = (loadedCategory as any)._operandsFormControls[0].value;

    expect(moment.isMoment(originalMoment)).toBeTrue();
    expect(moment.isMoment(loadedMoment)).toBeTrue();
    expect(loadedMoment.isSame(originalMoment)).toBeTrue();
}

function mockUserSearchValue(userName: string, userId: string): SearchAutocompleteOption<Array<string>> {
    return {text: userName, value: [userId], icon: (CaseDataset as any).AUTOCOMPLETE_ICON};
}
