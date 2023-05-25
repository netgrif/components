import {Properties} from './properties';
import {Icon} from './icon';

export const DEFAULT = "default";

export enum ComponentPrefixes {
    BOOLEAN = 'boolean-',
    BUTTON = 'button-',
    DATE = 'date-',
    DATE_TIME = 'date-time-',
    ENUMERATION = 'enumeration-',
    FILE = 'file-',
    FILE_LIST = 'file-list-',
    FILTER = 'filter-',
    I18N = 'i18n-',
    MULTICHOICE = 'multichoice-',
    NUMBER = 'number-',
    TASK_REF = 'task-ref-',
    TEXT = 'text-',
    USER = 'user-',
    USER_LIST = 'user-list-',
}

export interface Component {
    name: string;
    properties?: Properties;
    optionIcons?: Array<Icon>;
}
