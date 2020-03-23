export type DataType = 'meta' | 'immediate';

export interface Column {
    type: DataType;
    identifier: string;
    title: string;
    sortMode: string;
    searchQuery: string;
    columnId: string;
    fieldType: string;
}
