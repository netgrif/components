// TODO BUG 17.4.2020 - this file should contain very precise information about the intended structure of nae.json BUT this is a .d.ts file.
//  If we include other interfaces from the lib into this file, schematic compilation fails. Schematics reference this file without problem
//  but they can't reference files above their sourceRoot declared in their tsconfig file. Since this file is .d.ts it runs without anybody
//  noticing. However as soon as we include other interfaces from the lib here, schematics will reference them and fail to compile.
//  We need to find a good solution for this.

/**
 * This file is single point of truth for NAE frontend configuration schema.
 */

export type Resources =
    | Resource
    | Array<Resource>;

/**
 * Schema for NAE configuration object
 */
export interface NetgrifApplicationEngine {
    providers: SetAuthAndResourcesAddress;
    theme: Theme;
    locales?: Locales;
    filters?: Filters;
    views: Views;
    services?: Services;

    [k: string]: any;
}

export interface Locales {
    /**
     * Key is locale code (ISO639-1 '-' ISO3166-1)
     * Value is a file of translation
     */
    [k: string]: string;
}

export interface SetAuthAndResourcesAddress {
    auth: Auth;
    resources: Resources;

    [k: string]: any;
}

export interface Auth {
    address: string;
    authentication: string;
    sessionBearer?: string;
    endpoints?: string | { [k: string]: string };

    [k: string]: any;
}

export interface Resource {
    name: string;
    address: string;
    format: string;
    openApi?: string;
}

export interface Theme {
    name: string;
    pallets: {
        light: {
            primary:
                string
                | {
                '50'?: string;
                '100'?: string;
                '200'?: string;
                '300'?: string;
                '400'?: string;
                '500'?: string;
                '600'?: string;
                '700'?: string;
                '800'?: string;
                '900'?: string;
                contrast?: { 'light': string[]; 'dark': string[]; };
                [k: string]: any;
            };
            secondary?:
                string
                | {
                '50'?: string;
                '100'?: string;
                '200'?: string;
                '300'?: string;
                '400'?: string;
                '500'?: string;
                '600'?: string;
                '700'?: string;
                '800'?: string;
                '900'?: string;
                contrast?: { 'light': string[]; 'dark': string[]; };
                [k: string]: any;
            };
            warn?:
                string
                | {
                '50'?: string;
                '100'?: string;
                '200'?: string;
                '300'?: string;
                '400'?: string;
                '500'?: string;
                '600'?: string;
                '700'?: string;
                '800'?: string;
                '900'?: string;
                contrast?: { 'light': string[]; 'dark': string[]; };
                [k: string]: any;
            };
            [k: string]: any;
        };
        dark?: {
            primary?:
                string
                | {
                '50'?: string;
                '100'?: string;
                '200'?: string;
                '300'?: string;
                '400'?: string;
                '500'?: string;
                '600'?: string;
                '700'?: string;
                '800'?: string;
                '900'?: string;
                contrast?: { 'light': string[]; 'dark': string[]; };
                [k: string]: any;
            };
            secondary?:
                string
                | {
                '50'?: string;
                '100'?: string;
                '200'?: string;
                '300'?: string;
                '400'?: string;
                '500'?: string;
                '600'?: string;
                '700'?: string;
                '800'?: string;
                '900'?: string;
                contrast?: { 'light': string[]; 'dark': string[]; };
                [k: string]: any;
            };
            warn?:
                string
                | {
                '50'?: string;
                '100'?: string;
                '200'?: string;
                '300'?: string;
                '400'?: string;
                '500'?: string;
                '600'?: string;
                '700'?: string;
                '800'?: string;
                '900'?: string;
                contrast?: { 'light': string[]; 'dark': string[]; };
                [k: string]: any;
            };
            [k: string]: any;
        };
        [k: string]: any;
    };

    [k: string]: any;
}

export interface Filters {
    [k: string]: ConfigFilter;
}

export interface ConfigFilter {
    title: string;
    access?: string;
    query: object | Array<object>;
    type: 'Task' | 'Case';
    mergeOperator?: 'AND' | 'OR';

    [k: string]: any;
}

export interface Views {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-zA-Z0-9_]+$".
     */
    [k: string]: View;
}

export interface View {
    layout?: {
        name: string;
        params?: {
            orientation?: string;
            [k: string]: any;
        };
        [k: string]: any;
    };
    /**
     * Use own custom component for this view
     */
    component?: {
        class: string;
        from: string;
    };
    // layout: CaseLayout | TaskLayout;
    access:
        | {
        [k: string]: any;
    }
        | ('public' | 'private');
    navigation:
        | boolean
        | {
        title?: string;
        icon?: string;
        [k: string]: any;
    };
    children?: {
        /**
         * This interface was referenced by `undefined`'s JSON-Schema definition
         * via the `patternProperty` "^[a-zA-Z0-9_]+$".
         */
        [k: string]: View;
    };
    routing: {
        path: string;
        match?: boolean;
    };
    componentName?: string;

    [k: string]: any;
}

export interface CaseLayout {
    name: 'caseView';
    params: object;
}
export interface TaskLayout {
    name: 'taskView';
    params: object;
}

export interface Services {
    log?: {
        level?: string;
        logWithDate?: boolean;
        serializeParams?: boolean;
        includeLogLevel?: boolean;
        publishers?: any[];
        [k: string]: any;
    };
    auth?: {
        logoutRedirect?: string;
    };

    [k: string]: any;
}
