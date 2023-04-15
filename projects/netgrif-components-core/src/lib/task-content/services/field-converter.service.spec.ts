import {TestBed} from '@angular/core/testing';
import {FieldConverterService} from './field-converter.service';
import {TemplateAppearance} from '../../data-fields/models/template-appearance';
import {MaterialAppearance} from '../../data-fields/models/material-appearance';
import moment from 'moment';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DataFieldResource, DataRefResource} from '../model/resource-interfaces';
import {FieldAlignment} from '../../resources/interface/field-alignment';
import {FieldTypeResource} from '../model/field-type-resource';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FieldConvertorService', () => {
    let service: FieldConverterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                HttpClientTestingModule
            ]
        });
        service = TestBed.inject(FieldConverterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should test format value', () => {
        const dataField: DataFieldResource = {
            stringId: 'string',
            type: FieldTypeResource.TEXT,
            name: 'string',
            description: 'string',
            placeholder: 'string',
            behavior: {editable: true},
            value: {
                value: undefined
            },
            choices: [],
            validations: undefined
        };
        const dataRef: DataRefResource = {
            fieldId: 'stringId',
            field: dataField,
            layout: {
                x: 0,
                y: 0,
                rows: 1,
                cols: 1,
                offset: 0,
                template: TemplateAppearance.NETGRIF,
                appearance: MaterialAppearance.OUTLINE
            }
        } as DataRefResource

        expect(service.formatValueForBackend(service.toClass(dataRef), null)).toEqual(null);

        const date = moment();
        dataRef.field.type = FieldTypeResource.DATE;
        expect(service.formatValueForBackend(service.toClass(dataRef), null)).toEqual(undefined);
        expect(service.formatValueForBackend(service.toClass(dataRef), date))
            .toEqual(date.format('YYYY-MM-DD'));

        dataRef.field.type = FieldTypeResource.USER;
        expect(service.formatValueForBackend(service.toClass(dataRef), {id: 5})).toEqual(5);

        dataRef.field.type = FieldTypeResource.DATE_TIME;
        expect(service.formatValueForBackend(service.toClass(dataRef), date))
            .toEqual(date.format('DD.MM.YYYY HH:mm:ss'));

        dataRef.field.type = FieldTypeResource.NUMBER;
        expect(service.formatValueForBackend(service.toClass(dataRef), 5)).toEqual(5);
    });

    it('should test toClass and resolve method ', () => {
        const dataField: DataFieldResource = {
            stringId: 'string',
            type: FieldTypeResource.BOOLEAN,
            name: 'string',
            description: 'string',
            placeholder: 'string',
            behavior: {editable: true},
            value: {
                value: true
            },
            choices: ['ABC'],
            validations: undefined,
            subType: 'area'
        };
        const dataRef: DataRefResource = {
            fieldId: 'stringId',
            field: dataField,
            layout: {
                x: 0,
                y: 0,
                rows: 1,
                cols: 1,
                offset: 0,
                template: TemplateAppearance.NETGRIF,
                appearance: MaterialAppearance.OUTLINE,
                alignment: FieldAlignment.CENTER
            },
        } as DataRefResource

        expect(service.resolveType(service.toClass(dataRef))).toEqual('BOOLEAN');

        dataRef.field.type = FieldTypeResource.TEXT;
        dataRef.field.value.value  = 'string' as any;
        expect(service.resolveType(service.toClass(dataRef))).toEqual('TEXT');

        dataRef.field.type = FieldTypeResource.NUMBER;
        dataRef.field.value.value  = 5 as any;
        expect(service.resolveType(service.toClass(dataRef))).toEqual('NUMBER');

        dataRef.field.type = FieldTypeResource.ENUMERATION;
        expect(service.resolveType(service.toClass(dataRef))).toEqual('ENUMERATION');

        dataRef.field.type = FieldTypeResource.MULTICHOICE;
        expect(service.resolveType(service.toClass(dataRef))).toEqual('MULTICHOICE');

        dataRef.field.type = FieldTypeResource.ENUMERATION;
        dataRef.field.choices = {abc: 'abc'} as any;
        expect(service.resolveType(service.toClass(dataRef))).toEqual('ENUMERATION');

        dataRef.field.type = FieldTypeResource.MULTICHOICE;
        expect(service.resolveType(service.toClass(dataRef))).toEqual('MULTICHOICE');

        dataRef.field.type = FieldTypeResource.DATE;
        dataRef.field.value.value  = [2020, 3, 3] as any;
        expect(service.resolveType(service.toClass(dataRef))).toEqual('DATE');

        dataRef.field.type = FieldTypeResource.DATE_TIME;
        dataRef.field.value.value  = [2020, 3, 3, 3, 30] as any;
        expect(service.resolveType(service.toClass(dataRef))).toEqual('DATE_TIME');

        dataRef.field.type = FieldTypeResource.USER;
        dataRef.field.value.value  = {id: 5, name: 'name', surname: 'surname', email: 'mail'} as any;
        expect(service.resolveType(service.toClass(dataRef))).toEqual('USER');

        dataRef.field.type = FieldTypeResource.BUTTON;
        dataRef.field.value .value = 0 as any;
        expect(service.resolveType(service.toClass(dataRef))).toEqual('BUTTON');

        dataRef.field.type = FieldTypeResource.FILE;
        dataRef.field.value.value = undefined;
        expect(service.resolveType(service.toClass(dataRef))).toEqual('FILE');

        dataRef.field.type = FieldTypeResource.FILE_LIST;
        dataRef.field.value.value  = undefined;
        expect(service.resolveType(service.toClass(dataRef))).toEqual('FILE_LIST');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
