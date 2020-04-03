export enum HeaderColumnType {
    META = 'meta',
    IMMEDIATE = 'immediate',
}

export class HeaderColumn {

    public sortMode: string;
    public searchInput: any;

    constructor(public type: HeaderColumnType,
                public fieldIdentifier: string,
                public title: string,
                public fieldType: string,
                public petriNetIdentifier?: string
                ) { }

}
