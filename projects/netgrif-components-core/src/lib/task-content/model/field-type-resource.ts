/**
 * Contains types of renderable data fields.
 */
export enum FieldTypeResource {
    BOOLEAN = 'BOOLEAN',
    TEXT = 'TEXT',
    NUMBER = 'NUMBER',
    ENUMERATION = 'ENUMERATION',
    MULTICHOICE = 'MULTICHOICE',
    DATE = 'DATE',
    DATE_TIME = 'DATE_TIME',
    USER = 'USER',
    USER_LIST = 'USER_LIST',
    BUTTON = 'BUTTON',
    FILE = 'FILE',
    FILE_LIST = 'FILE_LIST',
    ENUMERATION_MAP = 'ENUMERATION_MAP',
    MULTICHOICE_MAP = 'MULTICHOICE_MAP',
    TASK_REF = 'TASK_REF',
    CASE_REF = 'CASE_REF',
    FILTER = 'FILTER',
    I18N = 'I_18_N',
    STRING_COLLECTION = 'STRING_COLLECTION'
}
