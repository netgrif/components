import {Injectable} from '@angular/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {Subject} from 'rxjs';

@Injectable()
export class BuilderPaginatorIntl implements MatPaginatorIntl {

    public changes;
    public firstPageLabel;
    public itemsPerPageLabel;
    public lastPageLabel;
    public nextPageLabel;
    public previousPageLabel;

    constructor() {
        this.changes = new Subject<void>();
        this.initTranslations();
    }

    public initTranslations() {
        this.firstPageLabel = 'First page';
        this.itemsPerPageLabel = 'Page size';
        this.lastPageLabel = 'Last page';
        this.nextPageLabel = 'Next page';
        this.previousPageLabel = 'Previous page';
    }

    public getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0) {
            return '1 of 1'
        }
        const amountPages = Math.ceil(length / pageSize);
        return (page + 1) + ' of ' + amountPages;
    }
}
