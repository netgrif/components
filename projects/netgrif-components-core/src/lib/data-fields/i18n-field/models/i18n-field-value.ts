export interface I18nFieldValue {
    defaultValue: string;
    key?: string;
    translations?: I18nFieldTranslations;
}

export interface I18nFieldTranslations {
    [k: string]: string;
}
