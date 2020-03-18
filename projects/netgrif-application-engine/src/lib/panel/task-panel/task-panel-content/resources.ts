import {DataFieldResource} from './resource-service';

export class Resources {
    static cols = 4;
    static data: DataFieldResource[] = [
        {
            stringId: 'text',
            type: 'text',
            name: 'Text',
            behavior: {
                editable: true,
                required: true
            },
            layout: {
                x: 0,
                y: 1,
                cols: 4,
                rows: 1
            },
            value: 'text',
            order: 0,
            defaultValue: 'text'
        },
        {
            stringId: 'text_area',
            type: 'text',
            name: 'Text_area',
            description: 'Text field description',
            placeholder: 'Text field placeholder',
            behavior: {
                editable: true,
                required: true
            },
            layout: {
                x: 0,
                y: 2,
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
                editable: true,
                required: true
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
                editable: true,
                required: true
            },
            layout: {
                x: 0,
                y: 3,
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
                editable: true,
                required: true
            },
            layout: {
                x: 0,
                y: 4,
                cols: 4,
                rows: 1
            },
            value: 'enumeration',
            order: 3,
            view : {
                value : 'list'
            },
            choices: [
                'enumeration',
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
                editable: true,
                required: true
            },
            layout: {
                x: 0,
                y: 5,
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
                editable: true,
                required: true
            },
            layout: {
                x: 0,
                y: 6,
                cols: 3,
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
                editable: true,
                required: true
            },
            layout: {
                x: 0,
                y: 7,
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
                editable: true,
                required: true
            },
            layout: {
                x: 0,
                y: 8,
                cols: 4,
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
                editable: true,
                required: true
            },
            layout: {
                x: 0,
                y: 9,
                cols: 4,
                rows: 1
            },
            order: 8,
            minDate: '2020-03-09',
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
                editable: true,
                required: true
            },
            layout: {
                x: 2,
                y: 10,
                cols: 1,
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
                editable: true,
                required: true
            },
            layout: {
                x: 2,
                y: 11,
                cols: 1,
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
                editable: true,
                required: true
            },
            layout: {
                x: 0,
                y: 12,
                cols: 4,
                rows: 1
            },
            order: 11
        },
        {
            stringId: 'button',
            type: 'button',
            name: 'Button',
            description: 'Button field description',
            placeholder: 'Button field placeholder',
            behavior: {
                editable: true,
                required: true
            },
            layout: {
                x: 2,
                y: 13,
                cols: 1,
                rows: 1
            },
            order: 0,
            subType: 'simple',
            defaultValue: 'button'
        },
        {
            stringId: 'text2',
            type: 'text',
            name: 'Text',
            description: 'Text field description',
            placeholder: 'Text field placeholder',
            behavior: {
                editable: true,
                required: true
            },
            layout: {
                x: 0,
                y: 14,
                cols: 4,
                rows: 1
            },
            value: 'text',
            order: 0,
            subType: 'simple',
            formatting: 'example@example.com',
            validationErrors: {
                email: false
            },
            defaultValue: 'text'
        }
    ];
}
