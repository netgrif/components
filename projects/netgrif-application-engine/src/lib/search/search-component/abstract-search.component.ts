import {SearchService} from '../search-service/search.service';
import {LoggerService} from '../../logger/services/logger.service';
import {DialogService} from '../../dialog/services/dialog.service';
import {TranslateService} from '@ngx-translate/core';
import {NAE_SEARCH_COMPONENT_CONFIGURATION} from '../models/component-configuration/search-component-configuration-injection-token';
import {EventEmitter, Inject, Input, OnInit, Optional, Output, Type} from '@angular/core';
import {SearchComponentConfiguration} from '../models/component-configuration/search-component-configuration';
import {SearchMode} from '../models/component-configuration/search-mode';
import {UserFiltersService} from '../../filter/user-filters.service';
import {AllowedNetsService} from '../../allowed-nets/services/allowed-nets.service';
import {NAE_SEARCH_CATEGORIES} from '../category-factory/search-categories-injection-token';
import {Category} from '../models/category/category';
import {SavedFilterMetadata} from '../models/persistance/saved-filter-metadata';
import {ViewIdService} from '../../user/services/view-id.service';
import {NAE_FILTERS_FILTER} from '../../filter/models/filters-filter-injection-token';
import {Filter} from '../../filter/models/filter';
import {TaskSetDataRequestBody} from '../../resources/interface/task-set-data-request-body';
import {NAE_NAVIGATION_ITEM_TASK_DATA} from '../../navigation/model/filter-case-injection-token';
import {DataGroup} from '../../resources/interface/data-groups';

/**
 * A universal search component that can be used to interactively create search predicates for anything with supported categories.
 *
 * This component is responsible for the interactive creation of an AND {@link ClausePredicate} object instance.
 * The nested Predicates are OR {@link ClausePredicate} instances created by {@link AbstractSearchClauseComponent}.
 *
 * Search categories must be provided by the {@link NAE_SEARCH_CATEGORIES} injection token.
 * Default factory methods for [task]{@link defaultTaskSearchCategoriesFactory} and
 * [case]{@link defaultCaseSearchCategoriesFactory} search categories exist. See their documentation for more information.
 *
 * The search component's visuals can be configured either by the {@link NAE_SEARCH_COMPONENT_CONFIGURATION} injection token,
 * or by the appropriate component inputs. The injection token configuration takes precedence over the inputs if both are present.
 */
export abstract class AbstractSearchComponent implements SearchComponentConfiguration, OnInit {

    public advancedSearchDisplayed;

    private _showSearchIcon = true;
    private _showSearchToggleButton = true;
    private _showAdvancedSearchHelp = true;
    private _showSaveFilterButton = true;
    private _showLoadFilterButton = true;
    private _initialSearchMode = SearchMode.FULLTEXT;

    /**
     * Set data request body, that is sent to the filter in addition to the default body.
     * The default body is applied first and can be overridden by this argument.
     */
    @Input() additionalFilterData: TaskSetDataRequestBody = {};

    /**
     * The emitted data contains the filter case object
     */
    @Output() filterLoaded: EventEmitter<SavedFilterMetadata> = new EventEmitter();
    /**
     * The emitted data contains only the saved case's ID
     */
    @Output() filterSaved: EventEmitter<SavedFilterMetadata> = new EventEmitter();

    protected constructor(protected _searchService: SearchService,
                          protected _logger: LoggerService,
                          protected _dialogService: DialogService,
                          protected _translate: TranslateService,
                          protected _userFilterService: UserFiltersService,
                          protected _allowedNetsService: AllowedNetsService,
                          protected _viewIdService: ViewIdService,
                          @Inject(NAE_SEARCH_CATEGORIES) protected _searchCategories: Array<Type<Category<any>>>,
                          @Optional() @Inject(NAE_SEARCH_COMPONENT_CONFIGURATION) protected _configuration: SearchComponentConfiguration,
                          @Optional() @Inject(NAE_FILTERS_FILTER) protected _filtersFilter: Filter = null,
                          @Optional() @Inject(NAE_NAVIGATION_ITEM_TASK_DATA) protected _navigationItemTaskData: Array<DataGroup> = null) {
        if (this._configuration === null) {
            this._configuration = {};
        }
    }

    ngOnInit(): void {
        this.advancedSearchDisplayed = this.initialSearchMode === SearchMode.ADVANCED;
    }

    get showSearchIcon(): boolean {
        return this._configuration.showSearchIcon ?? this._showSearchIcon;
    }

    @Input() set showSearchIcon(value: boolean) {
        this._showSearchIcon = value;
    }

    get showAdvancedSearchHelp(): boolean {
        return this._configuration.showAdvancedSearchHelp ?? this._showAdvancedSearchHelp;
    }

    @Input() set showAdvancedSearchHelp(value: boolean) {
        this._showAdvancedSearchHelp = value;
    }

    get showSaveFilterButton(): boolean {
        return this._configuration.showSaveFilterButton ?? this._showSaveFilterButton;
    }

    @Input() set showSaveFilterButton(value: boolean) {
        this._showSaveFilterButton = value;
    }

    get showLoadFilterButton(): boolean {
        return this._configuration.showLoadFilterButton ?? this._showLoadFilterButton;
    }

    @Input() set showLoadFilterButton(value: boolean) {
        this._showLoadFilterButton = value;
    }

    get initialSearchMode(): SearchMode {
        return this._configuration.initialSearchMode ?? this._initialSearchMode;
    }

    @Input() set initialSearchMode(value: SearchMode) {
        this._initialSearchMode = value;
    }

    get showSearchToggleButton(): boolean {
        return this._configuration.showSearchToggleButton ?? this._showSearchToggleButton;
    }

    @Input() set showSearchToggleButton(value: boolean) {
        this._showSearchToggleButton = value;
    }

    public hasPredicates(): boolean {
        return Array.from(this._searchService.rootPredicate.getPredicateMap().values()).some(value => value.isVisible);
    }

    public toggleSearchMode(): void {
        if (this.advancedSearchDisplayed) {
            this._searchService.clearPredicates();
        } else {
            this._searchService.clearFullTextFilter();
        }

        this.advancedSearchDisplayed = !this.advancedSearchDisplayed;
    }

    public showHelp(): void {
        this._dialogService.openAlertDialog(this._translate.instant('search.help.title'), this._translate.instant('search.help.text'));
    }

    /**
     * The saved filter data are emitted into the [filterSaved]{@link AbstractSearchComponent#filterSaved} `EventEmitter`
     */
    public saveFilter(): void {
        this._userFilterService.save(this._searchService, this._allowedNetsService.allowedNetsIdentifiers,
            this._searchCategories, this._viewIdService.viewId, this.additionalFilterData,
            this._configuration.saveFilterWithDefaultCategories ?? true,
            this._configuration.inheritAllowedNets ?? true).subscribe(savedFilterData => {
                if (savedFilterData) {
                    this.filterSaved.emit(savedFilterData);
                }
        });
    }

    /**
     * The loaded filter data are emitted into the [filterLoaded]{@link AbstractSearchComponent#filterLoaded} `EventEmitter`
     */
    public loadFilter(): void {
        this._userFilterService.load(this._searchService.filterType, this._filtersFilter ?? undefined).subscribe(savedFilterData => {
            if (savedFilterData) {
                this.filterLoaded.emit(savedFilterData);
            }
        });
    }
}
