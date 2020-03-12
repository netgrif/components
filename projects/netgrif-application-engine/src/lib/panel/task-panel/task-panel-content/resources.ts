import {DataFieldResource} from './resource-service';

export class Resources {
    static cols = 4;
    static data: DataFieldResource[] = [
        {
            stringId: 'text',
            type: 'text',
            name: 'Text',
            description: 'Text field description',
            placeholder: 'Text field placeholder',
            behavior: {
                editable: true
            },
            layout: {
                x: 0,
                y: 1,
                cols: 4,
                rows: 1
            },
            value: 'text',
            order: 0,
            subType: 'simple',
            formatting: 'example@example.com',
            validationJS: 'if(!(new RegExp("[a-z0-9!#\\u0024%&\'*+\/=?^_`{|}~-]+(?:\\.[a-z0-9!#\\u0024%&\'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?").test(value))){ if(this.validationErrors) this.validationErrors.email=true; return false;} else { if(this.validationErrors) this.validationErrors.email=false;} return true;',
            validationErrors: {
                email: false
            },
            defaultValue: 'text'
        },
        {
            stringId: 'text_area',
            type: 'text',
            name: 'Text_area',
            description: 'Text field description',
            placeholder: 'Text field placeholder',
            behavior: {
                editable: true
            },
            layout: {
                x: 0,
                y: 1,
                cols: 4,
                rows: 1
            },
            value: 'text',
            order: 1,
            view : {
                value : 'area'
            },
            subType: 'simple',
            formatting: 'example@example.com',
            validationJS: 'if(!(new RegExp("[a-z0-9!#\\u0024%&\'*+\/=?^_`{|}~-]+(?:\\.[a-z0-9!#\\u0024%&\'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?").test(value))){ if(this.validationErrors) this.validationErrors.email=true; return false;} else { if(this.validationErrors) this.validationErrors.email=false;} return true;',
            validationErrors: {
                email: false
            },
            defaultValue: 'text'
        },
        {
            stringId: 'number',
            type: 'number',
            name: 'Number',
            description: 'Number field description',
            placeholder: 'Number field placeholder',
            behavior: {
                editable: true
            },
            layout: {
                x: 0,
                y: 0,
                cols: 4,
                rows: 1
            },
            value: 10.0,
            order: 2,
            minValue: 0.0,
            validationJS: 'if(value < 0){ if(this.validationErrors) this.validationErrors.inrange=true; return false;} else { if(this.validationErrors) this.validationErrors.inrange=false;} return true;',
            validationErrors: {
                inrange: false
            },
            defaultValue: 10.0
        },
        {
            stringId: 'enumeration',
            type: 'enumeration',
            name: 'Enumeration',
            description: 'Enumeration field description',
            placeholder: 'Enumeration field placeholder',
            behavior: {
                editable: true
            },
            layout: {
                x: 0,
                y: 2,
                cols: 4,
                rows: 1
            },
            value: 'enumeration2',
            order: 3,
            choices: [
                'enumeration',
                'enumeration2',
                'enumeration3'
            ],
            defaultValue: 'enumeration'
        },
        {
            stringId: 'enumeration',
            type: 'enumeration',
            name: 'Enumeration',
            description: 'Enumeration field description',
            placeholder: 'Enumeration field placeholder',
            behavior: {
                editable: true
            },
            layout: {
                x: 0,
                y: 2,
                cols: 4,
                rows: 1
            },
            value: 'enumeration2',
            order: 3,
            view : {
                value : 'list'
            },
            choices: [
                'enumeration',
                'enumeration2',
                'enumeration3'
            ],
            defaultValue: 'enumeration'
        },
        {
            stringId: 'enumeration',
            type: 'enumeration',
            name: 'Enumeration',
            description: 'Enumeration field description',
            placeholder: 'Enumeration field placeholder',
            behavior: {
                editable: true
            },
            layout: {
                x: 0,
                y: 2,
                cols: 4,
                rows: 1
            },
            value: 'enumeration2',
            order: 4,
            view : {
                value : 'autocomplete'
            },
            choices: [
                'enumeration',
                'enumeration2',
                'enumeration3'
            ],
            defaultValue: 'enumeration'
        },
        {
            stringId: 'multichoice',
            type: 'multichoice',
            name: 'Multichoice',
            description: 'Multichoice field description',
            placeholder: 'Multichoice field placeholder',
            behavior: {
                editable: true
            },
            layout: {
                x: 0,
                y: 3,
                cols: 4,
                rows: 1
            },
            value: [
                'multichoice',
                'multichoice2'
            ],
            order: 5,
            choices: [
                'multichoice',
                'multichoice2',
                'multichoice3'
            ],
            defaultValue: [
                'multichoice',
                'multichoice2'
            ]
        },
        {
            stringId: 'multichoice',
            type: 'multichoice',
            name: 'Multichoice',
            description: 'Multichoice field description',
            placeholder: 'Multichoice field placeholder',
            behavior: {
                editable: true
            },
            layout: {
                x: 0,
                y: 3,
                cols: 4,
                rows: 1
            },
            value: [
                'multichoice',
                'multichoice2'
            ],
            order: 6,
            view : {
                value : 'list'
            },

            choices: [
                'multichoice',
                'multichoice2',
                'multichoice3',
                'multichoice4',
                'multichoice21',
                'multichoice31',
                'multichoice22',
                'multichoice23',
                'multichoice33'
            ],
            defaultValue: [
                'multichoice',
                'multichoice2'
            ]
        },
        {
            stringId: 'boolean',
            type: 'boolean',
            name: 'Boolean',
            description: 'Boolean field description',
            placeholder: 'Boolean field placeholder',
            behavior: {
                editable: true
            },
            layout: {
                x: 0,
                y: 4,
                cols: 2,
                rows: 1
            },
            value: true,
            order: 7,
            defaultValue: true
        },
        {
            stringId: 'date',
            type: 'date',
            name: 'Date',
            description: 'Date field description',
            placeholder: 'Date field placeholder',
            behavior: {
                editable: true
            },
            layout: {
                x: 0,
                y: 5,
                cols: 2,
                rows: 2
            },
            order: 8,
            minDate: '2020-03-09',
            validationJS: 'const startDate = new Date(\'2020-03-09\'); if((value - startDate) < -86400000){ if(this.validationErrors) this.validationErrors.between=true; return false;} else { if(this.validationErrors) this.validationErrors.between=false;} return true;',
            validationErrors: {
                between: false
            }
        },
        {
            stringId: 'file',
            type: 'file',
            name: 'File',
            description: 'File field description',
            placeholder: 'File field placeholder',
            behavior: {
                editable: true
            },
            layout: {
                x: 0,
                y: 6,
                cols: 4,
                rows: 1
            },
            order: 9
        },
        {
            stringId: 'user',
            type: 'user',
            name: 'User',
            description: 'User field description',
            placeholder: 'User field placeholder',
            behavior: {
                editable: true
            },
            layout: {
                x: 0,
                y: 7,
                cols: 4,
                rows: 1
            },
            order: 10,
            roles: []
        },
        {
            stringId: 'dateTime',
            type: 'dateTime',
            name: 'DateTime',
            description: 'DateTime field description',
            placeholder: 'DateTime field placeholder',
            behavior: {
                editable: true
            },
            layout: {
                x: 0,
                y: 8,
                cols: 4,
                rows: 1
            },
            order: 11
        }
    ];
}
