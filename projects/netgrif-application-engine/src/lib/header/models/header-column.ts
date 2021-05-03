import {SortDirection} from '@angular/material/sort';

export enum HeaderColumnType {
    META = 'meta',
    IMMEDIATE = 'immediate',
}

export class HeaderColumn {

    public sortDirection: SortDirection;
    public searchInput: any;

    constructor(public type: HeaderColumnType,
                public fieldIdentifier: string,
                public title: string,
                public fieldType: string,
                public initial = true,
                public petriNetIdentifier?: string) {
        if (this.type === HeaderColumnType.IMMEDIATE && !this.petriNetIdentifier) {
            throw new Error('HeaderColumn instances of type IMMEDIATE cannot be created without a petriNetIdentifier!');
        }
    }

    public get uniqueId(): string {
        return `${this.type === HeaderColumnType.IMMEDIATE ? this.petriNetIdentifier : 'meta'}-${this.fieldIdentifier}`;
    }
}
