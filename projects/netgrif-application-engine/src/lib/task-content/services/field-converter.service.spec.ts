import {TestBed} from '@angular/core/testing';
import {FieldConverterService} from './field-converter.service';
import {TemplateAppearance} from '../../data-fields/models/template-appearance';
import {MaterialAppearance} from '../../data-fields/models/material-appearance';
import moment from 'moment';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('FieldConvertorService', () => {
    let service: FieldConverterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ]
        });
        service = TestBed.inject(FieldConverterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should test format value', () => {
        const dataField = {
            stringId: 'string',
            type: 'text',
            name: 'string',
            description: 'string',
            placeholder: 'string',
            behavior: {editable: true},
            layout: {
                x: 0,
                y: 0,
                rows: 1,
                cols: 1,
                template: TemplateAppearance.NETGRIF,
                appearance: MaterialAppearance.OUTLINE
            },
            order: 0,
            value: undefined,
            choices: [],
            view: {
                value: 'area'
            },
            validations: undefined
        };
        expect(service.formatValue(service.toClass(dataField), null)).toEqual(null);

        const date = moment();
        dataField.type = 'date';
        expect(service.formatValue(service.toClass(dataField), null)).toEqual(undefined);
        expect(service.formatValue(service.toClass(dataField), date))
            .toEqual(date.format('YYYY-MM-DD'));

        dataField.type = 'user';
        expect(service.formatValue(service.toClass(dataField), {id: 5})).toEqual(5);

        dataField.type = 'dateTime';
        expect(service.formatValue(service.toClass(dataField), date))
            .toEqual(date.format('DD.MM.YYYY HH:mm:ss'));

        dataField.type = 'number';
        expect(service.formatValue(service.toClass(dataField), 5)).toEqual(5);
    });

    it('should test toClass and resolve method ', () => {
        const dataField = {
            stringId: 'string',
            type: 'boolean',
            name: 'string',
            description: 'string',
            placeholder: 'string',
            behavior: {editable: true},
            layout: {
                x: 0,
                y: 0,
                rows: 1,
                cols: 1,
                template: TemplateAppearance.NETGRIF,
                appearance: MaterialAppearance.OUTLINE
            },
            order: 0,
            value: true,
            choices: ['ABC'],
            view: {
                value: 'editor'
            },
            validations: undefined,
            subType: 'area'
        };
        expect(service.resolveType(service.toClass(dataField))).toEqual('boolean');

        dataField.type = 'text';
        dataField.value = 'string' as any;
        expect(service.resolveType(service.toClass(dataField))).toEqual('text');

        dataField.type = 'number';
        dataField.value = 5 as any;
        expect(service.resolveType(service.toClass(dataField))).toEqual('number');

        dataField.type = 'enumeration';
        dataField.view.value = 'list';
        expect(service.resolveType(service.toClass(dataField))).toEqual('enumeration');

        dataField.type = 'multichoice';
        dataField.view.value = 'list';
        expect(service.resolveType(service.toClass(dataField))).toEqual('multichoice');

        dataField.type = 'enumeration';
        dataField.view.value = 'autocomplete';
        dataField.choices = {abc: 'abc'} as any;
        expect(service.resolveType(service.toClass(dataField))).toEqual('enumeration');

        dataField.type = 'multichoice';
        dataField.view.value = 'list';
        expect(service.resolveType(service.toClass(dataField))).toEqual('multichoice');

        dataField.type = 'date';
        dataField.value = [2020, 3, 3] as any;
        expect(service.resolveType(service.toClass(dataField))).toEqual('date');

        dataField.type = 'dateTime';
        dataField.value = [2020, 3, 3, 3, 30] as any;
        expect(service.resolveType(service.toClass(dataField))).toEqual('dateTime');

        dataField.type = 'user';
        dataField.value = {id: 5, name: 'name', surname: 'surname', email: 'mail'} as any;
        expect(service.resolveType(service.toClass(dataField))).toEqual('user');

        dataField.type = 'button';
        dataField.value = 0 as any;
        expect(service.resolveType(service.toClass(dataField))).toEqual('button');

        dataField.type = 'file';
        dataField.value = undefined;
        expect(service.resolveType(service.toClass(dataField))).toEqual('file');
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
