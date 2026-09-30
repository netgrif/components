import {Injectable} from '@angular/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {Subject} from 'rxjs';
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class BuilderPaginatorIntl implements MatPaginatorIntl {

    public changes;
    public firstPageLabel;
    public itemsPerPageLabel;
    public lastPageLabel;
    public nextPageLabel;
    public previousPageLabel;

    constructor(private _translateService: TranslateService) {
        this.changes = new Subject<void>();
        this.initTranslations();
    }

    public initTranslations() {
        this.firstPageLabel = this._translateService.instant('builder.modeler.components.master-detail.firstPage');
        this.itemsPerPageLabel = this._translateService.instant('builder.modeler.components.master-detail.pageSize');
        this.lastPageLabel = this._translateService.instant('builder.modeler.components.master-detail.lastPage');
        this.nextPageLabel = this._translateService.instant('builder.modeler.components.master-detail.nextPage');
        this.previousPageLabel = this._translateService.instant('builder.modeler.components.master-detail.previousPage');
    }

    public getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0) {
            return '1 ' + this._translateService.instant('builder.modeler.components.master-detail.of') + ' 1'
        }
        const amountPages = Math.ceil(length / pageSize);
        return (page + 1) + ' ' + this._translateService.instant('builder.modeler.components.master-detail.of') + ' ' + amountPages;
    }
}
