import {DataField} from '../../data-fields/models/abstract-data-field';

export interface TaskFields {
    transitionId: string;
    fields: {
        [fieldId: string]: DataField<any>;
    };
}
