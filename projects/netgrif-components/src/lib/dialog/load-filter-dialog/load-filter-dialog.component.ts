import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
    AbstractCaseViewComponent, AllowedNetsService, AllowedNetsServiceFactory, BaseFilter,
    Case,
    CaseViewService,
    getImmediateData,
    LoadFilterInjectionData,
    LoggerService,
    NAE_BASE_FILTER, NAE_DEFAULT_HEADERS,
    SavedFilterMetadata,
    SearchService,
    SimpleFilter,
    UserFilterConstants
} from '@netgrif/components-core';
import {localAllowedNetsFactory} from '../../side-menu/content-components/load-filter/load-filter.component';
import {HeaderComponent} from '../../header/header.component';


export function loadBaseFilterFactory(dialogControl: LoadFilterInjectionData): BaseFilter {
    if (!dialogControl) {
        throw new Error('NewFilterCaseId was not provided in the side menu injection data');
    }
    const injectedData = dialogControl as LoadFilterInjectionData;

    return {filter: injectedData.filter};
}

@Component({
    selector: 'nc-load-filter-dialog',
    templateUrl: './load-filter-dialog.component.html',
    styleUrls: ['./load-filter-dialog.component.scss'],
    providers: [
        CaseViewService,
        SearchService,
        {
            provide: NAE_BASE_FILTER,
            useFactory: loadBaseFilterFactory,
            deps: [MAT_DIALOG_DATA]
        },
        {
            provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]
        },
        {
            provide: NAE_DEFAULT_HEADERS,
            useValue: ['meta-title', `${UserFilterConstants.FILTER_NET_IDENTIFIER}-${UserFilterConstants.FILTER_FIELD_ID}`]
        }
    ]
})
export class LoadFilterDialogComponent extends AbstractCaseViewComponent implements AfterViewInit {

    protected _injectedData: LoadFilterInjectionData;
    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    constructor(protected _dialogRef: MatDialogRef<LoadFilterDialogComponent>,
                @Inject(MAT_DIALOG_DATA) protected _data: LoadFilterInjectionData,
                protected _log: LoggerService,
                caseViewService: CaseViewService) {
        super(caseViewService);
        if (this._data) {
            this._injectedData = this._data as LoadFilterInjectionData;
        }
    }

    handleCaseClick(clickedCase: Case) {
        const immediate = getImmediateData(clickedCase, UserFilterConstants.FILTER_FIELD_ID);
        this._dialogRef.close({
            opened: false,
            message: 'Filter selected',
            data: {
                allowedNets: immediate.allowedNets,
                filterMetadata: immediate.filterMetadata,
                originViewId: getImmediateData(clickedCase, UserFilterConstants.ORIGIN_VIEW_ID_FIELD_ID).value,
                filterCase: clickedCase,
                filterCaseId: clickedCase.stringId,
                filter: new SimpleFilter(clickedCase.stringId, immediate.filterMetadata.filterType, {
                    query: immediate.value
                }, clickedCase.title)
            } as SavedFilterMetadata
        });
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
    }
}
