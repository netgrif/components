import {AfterViewInit, Component, Inject, OnDestroy, Optional, Type, ViewChild} from '@angular/core';
import {
    AbstractCaseViewComponent,
    Case,
    CaseViewService,
    SearchService,
    OverflowService,
    NAE_VIEW_ID_SEGMENT,
    ViewIdService,
    CategoryFactory,
    NAE_SEARCH_CATEGORIES,
    NAE_BASE_FILTER,
    AllowedNetsServiceFactory,
    AllowedNetsService,
    BaseFilter,
    FilterType,
    navigationItemTaskFilterFactory, FilterExtractionService, NAE_NAVIGATION_ITEM_TASK_DATA,
    navigationItemTaskAllowedNetsServiceFactory, BaseAllowedNetsService, NAE_DEFAULT_HEADERS,
    navigationItemCaseViewDefaultHeadersFactory,
    NAE_DEFAULT_CASE_SEARCH_CATEGORIES, groupNavigationViewIdSegmentFactory,
    DataGroup, SearchMode, HeaderMode, extractFieldValueFromData, GroupNavigationConstants, I18nFieldValue,
    extractSearchTypeFromData, SearchComponentConfiguration, NAE_NEW_CASE_CREATION_CONFIGURATION_DATA,
    navigationItemNewCaseConfigurationFactory, NewCaseCreationConfigurationData,
    ExportService,
    LoadingEmitter,
    HeaderColumn,
    LoggerService,
    SnackBarService, NAE_DYNAMIC_DEFAULT_SORT, ProcessService
} from '@netgrif/components-core';
import {HeaderComponent} from '../../../../../header/header.component';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {buildDynamicSortChangeDescriptionForCase$} from "../../model/factory-methods";


function baseFilterFactory(extractionService: FilterExtractionService,
                          activatedRoute?: ActivatedRoute,
                          navigationItemTaskData?: Array<DataGroup>): BaseFilter {
    return navigationItemTaskFilterFactory(extractionService, GroupNavigationConstants.ITEM_FIELD_CASE_FILTER, activatedRoute,
        navigationItemTaskData, undefined, FilterType.CASE);
}

function allowedNetsFactory(factory: AllowedNetsServiceFactory,
                            baseAllowedNets: BaseAllowedNetsService,
                            navigationItemTaskData?: Array<DataGroup>): AllowedNetsService {
    return navigationItemTaskAllowedNetsServiceFactory(factory, baseAllowedNets, true, navigationItemTaskData);
}

@Component({
    selector: 'nc-default-simple-case-view',
    templateUrl: './default-simple-case-view.component.html',
    styleUrls: ['./default-simple-case-view.component.scss'],
    providers: [
        CategoryFactory,
        CaseViewService,
        SearchService,
        OverflowService,
        {
            provide: NAE_DYNAMIC_DEFAULT_SORT,
            useFactory: buildDynamicSortChangeDescriptionForCase$,
            deps: [NAE_NAVIGATION_ITEM_TASK_DATA, ProcessService]
        },
        {
            provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory,
            deps: [FilterExtractionService, ActivatedRoute, [new Optional(), NAE_NAVIGATION_ITEM_TASK_DATA]]
        },
        {
            provide: AllowedNetsService,
            useFactory: allowedNetsFactory,
            deps: [AllowedNetsServiceFactory, BaseAllowedNetsService, [new Optional(), NAE_NAVIGATION_ITEM_TASK_DATA]]
        },
        {   provide: NAE_VIEW_ID_SEGMENT, useFactory: groupNavigationViewIdSegmentFactory, deps: [ActivatedRoute]},
        ViewIdService,
        {
            provide: NAE_SEARCH_CATEGORIES,
            useExisting: NAE_DEFAULT_CASE_SEARCH_CATEGORIES
        },
        {
            provide: NAE_DEFAULT_HEADERS,
            useFactory: navigationItemCaseViewDefaultHeadersFactory,
            deps: [NAE_NAVIGATION_ITEM_TASK_DATA]
        },
        {
            provide: NAE_NEW_CASE_CREATION_CONFIGURATION_DATA,
            useFactory: navigationItemNewCaseConfigurationFactory,
            deps: [NAE_NAVIGATION_ITEM_TASK_DATA]
        }
    ],
})
export class DefaultSimpleCaseViewComponent extends AbstractCaseViewComponent implements AfterViewInit, OnDestroy {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    initialSearchMode: SearchMode;
    showToggleButton: boolean;
    enableSearch: boolean;
    showCreateCaseButton: boolean;
    showDeleteMenu: boolean;
    headersChangeable: boolean;
    headersMode: string[];
    allowTableMode: boolean;
    defaultHeadersMode: HeaderMode;
    emptyContentText: I18nFieldValue;
    emptyContentIcon: string;
    allowExport: boolean;
    loading$: LoadingEmitter;
    private _currentHeaders: Array<HeaderColumn> = [];
    private _headersSub: Subscription;

    constructor(protected caseViewService: CaseViewService,
                protected _searchService: SearchService,
                protected loggerService: LoggerService,
                protected _snackbar: SnackBarService,
                protected _translate: TranslateService,
                protected _exportService: ExportService,
                @Inject(NAE_NAVIGATION_ITEM_TASK_DATA) protected _navigationItemTaskData: Array<DataGroup>,
                @Inject(NAE_NEW_CASE_CREATION_CONFIGURATION_DATA) protected _newCaseCreationConfigurationData: NewCaseCreationConfigurationData,
                @Optional() overflowService: OverflowService) {
        super(caseViewService, overflowService, undefined, _newCaseCreationConfigurationData);
        const searchType = extractSearchTypeFromData(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_VIEW_SEARCH_TYPE);
        const searchTypeConfig: SearchComponentConfiguration = {
            showSearchIcon: true,
            showSearchToggleButton: searchType === SearchMode.ADVANCED,
            initialSearchMode: (searchType === undefined) ? undefined : SearchMode.FULLTEXT,
        }
        const viewHeadersMode = extractFieldValueFromData<string[]>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_HEADERS_MODE);
        const viewDefaultHeadersMode = extractFieldValueFromData<string>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_DEFAULT_HEADERS_MODE);

        this.initialSearchMode = searchTypeConfig.initialSearchMode;
        this.showToggleButton = searchTypeConfig.showSearchToggleButton;
        this.enableSearch = searchTypeConfig.initialSearchMode !== undefined;
        this.showCreateCaseButton = this._newCaseCreationConfigurationData.newCaseButtonConfig.showCreateCaseButton;
        this.showDeleteMenu = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_SHOW_MORE_MENU);
        this.headersChangeable = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_HEADERS_CHANGEABLE);
        this.headersMode = viewHeadersMode ? viewHeadersMode : [];
        this.allowTableMode = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_ALLOW_TABLE_MODE);
        this.defaultHeadersMode = this.resolveHeaderMode(viewDefaultHeadersMode)
        this.emptyContentText = extractFieldValueFromData<I18nFieldValue>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_EMPTY_CONTENT_TEXT);
        this.emptyContentIcon = extractFieldValueFromData<string>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_EMPTY_CONTENT_ICON);
        this.allowExport = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_ALLOW_EXPORT);

        this.loading$ = new LoadingEmitter();
        this._headersSub = this.selectedHeaders$.subscribe(headers => {
            this._currentHeaders = headers;
        });
    }

    protected resolveHeaderMode(mode: string): HeaderMode {
        switch (mode) {
            case 'sort':
                return HeaderMode.SORT;
            case 'edit':
                return HeaderMode.EDIT;
            case 'search':
                return HeaderMode.SEARCH;
            default:
                return undefined;
        }
    }

    public isMenuOptionEnabled(option: string): boolean {
        return this.headersMode.some(e => e === option);
    }

    isLoading(): boolean {
        return this.loading$.isActive;
    }

    export(): void {
        if (this.loading$.isActive) {
            return;
        }
        this.loading$.on();
        this._exportService.downloadExcelFromCurrentSelection(this._searchService.activeFilter, this._currentHeaders).subscribe(() => {
            this.loading$.off();
        },error => {
            this.loggerService.error('File download failed', error);
            this._snackbar.openErrorSnackBar(this._translate.instant('export.errorExportDownload'));
            this.loading$.off();
        });
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
        this.caseHeaderComponent.changeHeadersMode(this.defaultHeadersMode, false);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._headersSub?.unsubscribe();
        this.loading$.complete()
    }

    public handleCaseClick(clickedCase: Case): void {
    }
}
