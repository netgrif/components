import {TestBed} from '@angular/core/testing';
import {FieldConverterService} from './field-converter.service';
import {TemplateAppearance} from '../../data-fields/models/template-appearance';
import {MaterialAppearance} from '../../data-fields/models/material-appearance';
import moment from 'moment';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DataFieldResource} from '../model/resource-interface';
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
            layout: {
                x: 0,
                y: 0,
                rows: 1,
                cols: 1,
                offset: 0,
                template: TemplateAppearance.NETGRIF,
                appearance: MaterialAppearance.OUTLINE
            },
            order: 0,
            value: undefined,
            choices: [],
            validations: undefined
        };
        expect(service.formatValueForBackend(service.toClass(dataField), null)).toEqual(null);

        const date = moment();
        dataField.type = FieldTypeResource.DATE;
        expect(service.formatValueForBackend(service.toClass(dataField), null)).toEqual(null);
        expect(service.formatValueForBackend(service.toClass(dataField), date))
            .toEqual(date.format('YYYY-MM-DD'));

        dataField.type = FieldTypeResource.USER;
        expect(service.formatValueForBackend(service.toClass(dataField), {id: 5})).toEqual(5);

        dataField.type = FieldTypeResource.DATE_TIME;
        expect(service.formatValueForBackend(service.toClass(dataField), date))
            .toEqual(date.format('DD.MM.YYYY HH:mm:ss'));

        dataField.type = FieldTypeResource.NUMBER;
        expect(service.formatValueForBackend(service.toClass(dataField), 5)).toEqual(5);
    });

    it('should test toClass and resolve method ', () => {
        const dataField: DataFieldResource = {
            stringId: 'string',
            type: FieldTypeResource.BOOLEAN,
            name: 'string',
            description: 'string',
            placeholder: 'string',
            behavior: {editable: true},
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
            order: 0,
            value: true,
            choices: ['ABC'],
            validations: undefined,
            subType: 'area'
        };
        expect(FieldConverterService.resolveType(service.toClass(dataField))).toEqual('boolean');

        dataField.type = FieldTypeResource.TEXT;
        dataField.value = 'string' as any;
        expect(FieldConverterService.resolveType(service.toClass(dataField))).toEqual('text');

        dataField.type = FieldTypeResource.NUMBER;
        dataField.value = 5 as any;
        expect(FieldConverterService.resolveType(service.toClass(dataField))).toEqual('number');

        dataField.type = FieldTypeResource.ENUMERATION;
        expect(FieldConverterService.resolveType(service.toClass(dataField))).toEqual('enumeration');

        dataField.type = FieldTypeResource.MULTICHOICE;
        expect(FieldConverterService.resolveType(service.toClass(dataField))).toEqual('multichoice');

        dataField.type = FieldTypeResource.ENUMERATION;
        dataField.choices = {abc: 'abc'} as any;
        expect(FieldConverterService.resolveType(service.toClass(dataField))).toEqual('enumeration');

        dataField.type = FieldTypeResource.MULTICHOICE;
        expect(FieldConverterService.resolveType(service.toClass(dataField))).toEqual('multichoice');

        dataField.type = FieldTypeResource.DATE;
        dataField.value = [2020, 3, 3] as any;
        expect(FieldConverterService.resolveType(service.toClass(dataField))).toEqual('date');

        dataField.type = FieldTypeResource.DATE_TIME;
        dataField.value = [2020, 3, 3, 3, 30] as any;
        expect(FieldConverterService.resolveType(service.toClass(dataField))).toEqual('dateTime');

        dataField.type = FieldTypeResource.USER;
        dataField.value = {id: 5, name: 'name', surname: 'surname', email: 'mail'} as any;
        expect(FieldConverterService.resolveType(service.toClass(dataField))).toEqual('user');

        dataField.type = FieldTypeResource.BUTTON;
        dataField.value = 0 as any;
        expect(FieldConverterService.resolveType(service.toClass(dataField))).toEqual('button');

        dataField.type = FieldTypeResource.FILE;
        dataField.value = undefined;
        expect(FieldConverterService.resolveType(service.toClass(dataField))).toEqual('file');

        dataField.type = FieldTypeResource.FILE_LIST;
        dataField.value = undefined;
        expect(FieldConverterService.resolveType(service.toClass(dataField))).toEqual('fileList');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
