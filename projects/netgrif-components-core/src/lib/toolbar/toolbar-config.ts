import {I18nFieldValue} from '../data-fields/i18n-field/models/i18n-field-value';

export interface ToolbarConfig {
    profileEnabled?: boolean;
    languageEnabled?: boolean;
    logoutEnabled?: boolean;
    simpleToolbar?: boolean;
    toolbarName?: I18nFieldValue;
    toolbarLogo?: string;
    profileUrl?: string;
    loginUrl?: string;
}
