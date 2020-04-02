export enum HeaderColumnType {
    META = 'meta',
    IMMEDIATE = 'immediate',
}

export interface HeaderColumn {
    type: HeaderColumnType;
    fieldIdentifier: string;
    title: string;
    sortMode: string;
    searchInput: string;
    fieldType: string;
    petriNetIdentifier?: string;
}
