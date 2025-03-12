
export enum FieldValidation {
    REQUIRED = 'required'
}

export enum BooleanFieldValidation {
    REQUIRED_TRUE = 'requiredTrue',
}

export enum AbstractTimeInstanceFieldValidation {
    BETWEEN = 'between',
    WORKDAY = 'workday',
    WEEKEND = 'weekend'
}

export enum EnumerationFieldValidation {
    WRONG_VALUE = 'wrongValue'
}

export enum FileListFieldValidation {
    MAX_FILES = 'maxFiles'
}

export enum I18nFieldValidation {
    TRANSLATION_REQUIRED = 'translationRequired',
    TRANSLATION_ONLY = 'translationOnly',
    REQUIRED_I18N = 'requiredI18n'
}

export enum NumberFieldValidation {
    ODD = 'odd',
    EVEN = 'even',
    POSITIVE = 'positive',
    NEGATIVE = 'negative',
    DECIMAL = 'decimal',
    IN_RANGE = 'inrange',
    INF = 'inf'
}

export enum TextFieldValidation {
    MIN_LENGTH = 'minLength',
    MAX_LENGTH = 'maxLength',
    PATTERN = 'pattern',
    REGEX = 'regex',
    TEL_NUMBER = 'telNumber',
    EMAIL = 'email'
}
