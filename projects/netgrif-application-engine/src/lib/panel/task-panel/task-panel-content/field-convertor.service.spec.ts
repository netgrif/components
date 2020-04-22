import {TestBed} from '@angular/core/testing';

import {FieldConvertorService} from './field-convertor.service';
import {
    Layout,
    MaterialAppearance,
    TemplateAppearance,
    Validation
} from '../../../data-fields/models/abstract-data-field';

describe('FieldConvertorService', () => {
    let service: FieldConvertorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FieldConvertorService);
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

        dataField.type = 'date';
        expect(service.formatValue(service.toClass(dataField), null)).toEqual(undefined);
        expect(service.formatValue(service.toClass(dataField), new Date()))
            .toEqual(`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`);

        dataField.type = 'user';
        expect(service.formatValue(service.toClass(dataField), {id: 5})).toEqual(5);

        dataField.type = 'dateTime';
        expect(service.formatValue(service.toClass(dataField), new Date()))
            .toEqual(`${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()} ` +
                `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);

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
});
