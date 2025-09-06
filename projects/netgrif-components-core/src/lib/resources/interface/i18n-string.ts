export function resolveI18n(value: string | I18nString): string {
    return typeof value === 'string' ? value : value.defaultValue;
}

export interface I18nString {
    defaultValue: string;
    key?: string;
    translations?: I18nStringTranslations;
}

export interface I18nStringTranslations {
    [k: string]: string;
}
