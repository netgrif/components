import {
    Component,
    Inject,
    Optional,
    ViewChild,
    Input
} from '@angular/core';
import {CaseViewService} from '../../service/case-view-service';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {LoggerService} from '../../../../logger/services/logger.service';
import {NAE_TAB_DATA} from '../../../../tabs/tab-data-injection-token/tab-data-injection-token';
import {InjectedTabData} from '../../../../tabs/interfaces';
import {ActivatedRoute} from '@angular/router';
import {AbstractDefaultCaseListComponent} from '../default-case-list/abstract-default-case-list.component';
import {I18nFieldValue} from "../../../../data-fields/i18n-field/models/i18n-field-value";
import {LanguageService} from "../../../../translate/language.service";

@Component({
    selector: 'ncc-abstract-case-list',
    template: ''
})
export abstract class AbstractCaseListComponent extends AbstractDefaultCaseListComponent {

    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;
    @Input() emptyContentText: I18nFieldValue | undefined;
    @Input() emptyContentIcon: string = 'storage';

    protected constructor(protected _caseViewService: CaseViewService,
                          protected _log: LoggerService,
                          @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData,
                          protected _selectLangService: LanguageService,
                          protected route?: ActivatedRoute) {
        super(_caseViewService, _log, injectedTabData, route);
        this.cases$ = this._caseViewService.cases$;
        this.onRedirect();
    }

    public trackBy(i): any {
        return i;
    }

    public get loadedDataSize(): number {
        return this.viewport && this.viewport.getDataLength() ? this.viewport.getDataLength() : 0;
    }

    public loadNextPage(): void {
        if (!this.viewport) {
            return;
        }
        this._caseViewService.nextPage(this.viewport.getRenderedRange(), this.viewport.getDataLength());
    }

    public hasEmptyContentText(): boolean {
        const text: string = this.getEmptyContentText();
        return text !== undefined && text !== '';
    }

    public getEmptyContentText(): string {
        const lang: string = this._selectLangService.getLanguage();
        let resultText: string = this.emptyContentText.translations[lang];
        if (!resultText) {
            resultText = this.emptyContentText.defaultValue;
        }
        return resultText;
    }

    public getEmptyContentIcon(): string {
        return !!this.emptyContentIcon && this.emptyContentIcon !== '' ? this.emptyContentIcon : 'storage';
    }
}
