import {MatPaginatorIntl} from '@angular/material/paginator';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../translate/language.service';

@Injectable()
export class NetgrifPaginatorIntl implements MatPaginatorIntl {

    public changes;
    public firstPageLabel;
    public itemsPerPageLabel;
    public lastPageLabel;
    public nextPageLabel;
    public previousPageLabel;

    constructor(protected _translate: TranslateService, protected _languageService: LanguageService) {
        this.changes = new Subject<void>();
        this.initTranslations();
        this._languageService.getLangChange$().subscribe(lang => {
            this.initTranslations();
        });
    }


    public initTranslations() {
        this.firstPageLabel = this._translate.instant('paginator.firstPage');
        this.itemsPerPageLabel = this._translate.instant('paginator.itemsPage');
        this.lastPageLabel = this._translate.instant('paginator.lastPage');
        this.nextPageLabel = this._translate.instant('paginator.nextPage');
        this.previousPageLabel = this._translate.instant('paginator.previousPage');
    }

    public getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0) {
            return this._translate.instant('paginator.pageOne');
        }
        const amountPages = Math.ceil(length / pageSize);
        return this._translate.instant('paginator.pageAmount', {page: page + 1, amountPages});
    }
}
