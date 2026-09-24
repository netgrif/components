import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {FieldsGroup} from './models/fields-group';
import {HeaderState, HeaderStateInterface} from './header-state';
import {Injectable, OnDestroy, Optional} from '@angular/core';
import {SortChangeDescription} from './models/user-changes/sort-change-description';
import {SearchChangeDescription} from './models/user-changes/search-change-description';
import {HeaderChange} from './models/user-changes/header-change';
import {PetriNetReference} from '../resources/interface/petri-net-reference';
import {HeaderType} from './models/header-type';
import {HeaderMode} from './models/header-mode';
import {HeaderColumn, HeaderColumnType} from './models/header-column';
import {UserPreferenceService} from '../user/services/user-preference.service';
import {LoggerService} from '../logger/services/logger.service';
import {LoadingEmitter} from '../utility/loading-emitter';
import {SortDirection} from '@angular/material/sort';
import {HeaderChangeType} from './models/user-changes/header-change-type';
import {ViewIdService} from '../user/services/view-id.service';
import {Net} from '../process/net';
import {OverflowService} from './services/overflow.service';
import {SortingHeader} from "../resources/interface/sorting-header";
import {HeaderSortingMode} from './models/header-sorting-mode';

@Injectable()
export abstract class AbstractHeaderService implements OnDestroy {

    public static readonly DEFAULT_HEADER_COUNT = 5;
    public static readonly DEFAULT_HEADER_RESPONSIVITY = true;

    protected _headerColumnCount$: BehaviorSubject<number>;
    protected _preferenceColumnCount$: ReplaySubject<number>;
    protected _responsiveHeaders$: BehaviorSubject<boolean>;
    protected _headerState: HeaderState;
    protected _headerChange$: Subject<HeaderChange>;
    protected _appliedSorts$: ReplaySubject<Array<HeaderColumn>>;
    protected _clearHeaderSearch$: Subject<number>;
    private _initDefaultHeaders: Array<string>;
    private _initializedCount: boolean;
    private readonly _sortingMode: HeaderSortingMode;

    public loading: LoadingEmitter;
    public fieldsGroup: Array<FieldsGroup>;

    protected constructor(protected _headerType: HeaderType,
                          protected _preferences: UserPreferenceService,
                          protected _logger: LoggerService,
                          @Optional() private _viewIdService: ViewIdService,
                          @Optional() protected _overflowService: OverflowService,
                          sortingMode: HeaderSortingMode = HeaderSortingMode.SINGLE) {
        this._sortingMode = sortingMode ?? HeaderSortingMode.SINGLE;
        this.loading = new LoadingEmitter(true);
        this._headerChange$ = new Subject<HeaderChange>();
        this._appliedSorts$ = new ReplaySubject<Array<HeaderColumn>>(1);
        this.fieldsGroup = [{groupTitle: 'Meta data', fields: this.createMetaHeaders()}];
        this._headerColumnCount$ = new BehaviorSubject<number>(AbstractHeaderService.DEFAULT_HEADER_COUNT);
        this._responsiveHeaders$ = new BehaviorSubject<boolean>(AbstractHeaderService.DEFAULT_HEADER_RESPONSIVITY);
        this._preferenceColumnCount$ = new ReplaySubject<number>();
        this._clearHeaderSearch$ = new Subject<number>();
        this._initializedCount = false;

        if (this._viewIdService === null) {
            this._logger.warn('Header service could not inject ViewIdService! User preferences won\'t be loaded or saved!');
        }

        this._preferences.preferencesChanged$.subscribe(() => {
            this.loadHeadersFromPreferences();
            this.loadSortsFromPreferences();
        });

        this.initializeHeaderState();
    }

    /**
     * Provides Observable for all changes in header
     */
    get headerChange$(): Observable<HeaderChange> {
        return this._headerChange$.asObservable();
    }

    get selectedHeaders$(): Observable<Array<HeaderColumn>> {
        return this._headerState.selectedHeaders$;
    }

    get selectedSorts$(): Observable<Array<HeaderColumn>> {
        return this._headerState.selectedSorts$;
    }

    get sortingMode(): HeaderSortingMode {
        return this._sortingMode;
    }

    get appliedSorts$(): Observable<Array<HeaderColumn>> {
        return this._appliedSorts$.asObservable();
    }

    get headerState(): HeaderStateInterface {
        return this._headerState.asInterface();
    }

    get headerType(): HeaderType {
        return this._headerType;
    }

    get overflowMode(): boolean {
        if (!!this._overflowService) {
            return this._overflowService.overflowMode;
        } else {
            return false;
        }
    }

    get headerColumnCount(): number {
        return this._headerColumnCount$.getValue();
    }

    set headerColumnCount(maxColumns: number) {
        if (maxColumns !== this.headerColumnCount) {
            this._headerColumnCount$.next(maxColumns);
            this.updateHeaderColumnCount();
            if (!this._initializedCount) {
                this.initializeDefaultHeaderState();
                this._initializedCount = true;
            }
        }
    }

    get headerColumnCount$(): Observable<number> {
        return this._headerColumnCount$.asObservable();
    }

    get responsiveHeaders(): boolean {
        return this._responsiveHeaders$.getValue();
    }

    set responsiveHeaders(responsiveHeaders: boolean) {
        this._responsiveHeaders$.next(responsiveHeaders);
    }

    get responsiveHeaders$(): Observable<boolean> {
        return this._responsiveHeaders$.asObservable();
    }

    get clearHeaderSearch$(): Observable<number> {
        return this._clearHeaderSearch$.asObservable();
    }

    set initDefaultHeaders(defaultHeaders: Array<string>) {
        this._initDefaultHeaders = defaultHeaders;
    }

    get initDefaultHeaders(): Array<string> {
        return this._initDefaultHeaders;
    }

    get preferenceColumnCount$(): Observable<number> {
        return this._preferenceColumnCount$.asObservable();
    }

    private initializeHeaderState(): void {
        const defaultHeaders = [];
        for (let i = 0; i < this.fieldsGroup[0].fields.length && defaultHeaders.length < this.headerColumnCount; i++) {
            if (this.fieldsGroup[0].fields[i].initial) {
                defaultHeaders.push(this.fieldsGroup[0].fields[i]);
            }
        }
        while (defaultHeaders.length < this.headerColumnCount) {
            defaultHeaders.push(null);
        }
        this._headerState = new HeaderState(defaultHeaders);
    }

    protected initializeDefaultHeaderState(): void {
        if (this.initDefaultHeaders && Array.isArray(this.initDefaultHeaders)) {
            const defaultHeaders = [];
            for (let i = 0; i < this.headerColumnCount; i++) {
                defaultHeaders.push(null);
            }
            for (let i = 0; i < this.initDefaultHeaders.length; i++) {
                if (i >= this.headerColumnCount) {
                    this._logger.warn('there are more NAE_DEFAULT_HEADERS than header columns. Skipping the rest...');
                    break;
                }
                for (const h of this.fieldsGroup) {
                    const head = h.fields.find(header => header.uniqueId === this.initDefaultHeaders[i]);
                    if (head) {
                        defaultHeaders[i] = head;
                        break;
                    }
                }
            }
            this._headerState.updateSelectedHeaders(defaultHeaders);
        }
        this.loadHeadersFromPreferences();
        this.loadSortsFromPreferences();
    }

    /**
     * Adds `null` headers if the new count is greater than the current count.
     *
     * Removes extra headers if the new count is smaller than the current count.
     */
    protected updateHeaderColumnCount(): void {
        let headers = this._headerState.selectedHeaders;
        if (headers.length < this.headerColumnCount) {
            const lastSelectedHeaders = this._headerState.lastSelectedHeaders;
            if (headers.length < this.headerColumnCount && !!lastSelectedHeaders && headers.length < lastSelectedHeaders.length) {
                headers.push(...lastSelectedHeaders.slice(headers.length, this.headerColumnCount));
            }
            while (headers.length <= this.headerColumnCount) {
                headers.push(null);
            }
        } else if (headers.length > this.headerColumnCount) {
            headers = headers.slice(0, this.headerColumnCount);
        }
        this._headerState.updateSelectedHeaders(headers);
    }

    public setAllowedNets(allowedNets: Array<PetriNetReference>) {
        /* TODO by simply replacing the select options with new object, we don't loose the old references.
             Columns with headers from nets that are no longer allowed should have their value cleared.
             Columns with valid values that are not metadata should have their selection remapped to the new objects.
         */

        const fieldsGroups: Array<FieldsGroup> = [];
        allowedNets.forEach(allowedNet => {
            const fieldsGroup: FieldsGroup = {
                groupTitle: allowedNet.title,
                fields: []
            };
            allowedNet.immediateData.forEach(immediate => {
                fieldsGroup.fields.push(
                    new HeaderColumn(HeaderColumnType.IMMEDIATE, immediate.stringId, immediate.title,
                        immediate.type, false, allowedNet.identifier)
                );
            });
            fieldsGroups.push(fieldsGroup);
        });

        this.fieldsGroup.splice(1, this.fieldsGroup.length - 1);
        this.fieldsGroup.push(...fieldsGroups);
    }

    public setTaskAllowedNets(allowedNets: Array<Net>) {
        /* TODO by simply replacing the select options with new object, we don't loose the old references.
             Columns with headers from nets that are no longer allowed should have their value cleared.
             Columns with valid values that are not metadata should have their selection remapped to the new objects.
         */

        const fieldsGroups: Array<FieldsGroup> = [];
        allowedNets.forEach(allowedNet => {
            const fieldsGroup: FieldsGroup = {
                groupTitle: allowedNet.title,
                fields: []
            };
            const existing = new Set();
            allowedNet.transitions.forEach(trans => {
                trans.immediateData.forEach(data => {
                    if (!existing.has(data.stringId)) {
                        existing.add(data.stringId);
                        fieldsGroup.fields.push(
                            new HeaderColumn(HeaderColumnType.IMMEDIATE, data.stringId,
                                data.title, data.type, false, allowedNet.identifier)
                        );
                    }
                });
            });
            fieldsGroups.push(fieldsGroup);
        });

        this.fieldsGroup.splice(1, this.fieldsGroup.length - 1);
        this.fieldsGroup.push(...fieldsGroups);
    }

    /**
     * If this view has som headers stored in it's preferences attempts to load them.
     * If the preferences contain nonexistent headers they will be skipped.
     *
     * This function is NOT called by the abstract class' constructor.
     * It is the responsibility of the child class to call it at an appropriate moment.
     */
    protected loadHeadersFromPreferences(): void {
        const viewId = this.getViewId();
        if (!viewId) {
            return;
        }
        const preferredHeaderKeys = this._preferences.getHeaders(viewId);
        if (!preferredHeaderKeys) {
            return;
        }
        const newHeaders = [];
        preferredHeaderKeys.forEach(headerKey => {
            for (const fieldGroup of this.fieldsGroup) {
                for (const header of fieldGroup.fields) {
                    if (header.uniqueId === headerKey) {
                        newHeaders.push(header);
                        return; // continue the outermost loop
                    }
                }
            }
            // no match found
            newHeaders.push(null);
            this._logger.warn(
                `Could not restore header with ID '${headerKey}' from preferences. It is not one of the available headers for this view.`);
        });
        this._preferenceColumnCount$.next(newHeaders.length);
        this._headerState.updateSelectedHeaders(newHeaders);
    }

    protected loadSortsFromPreferences(): void {
        const viewId = this.getViewId();
        if (!viewId) {
            this.applySelectedSorts();
            return;
        }
        const preferredSorts = this._preferences.getSorts(viewId);
        const headersWithSortState = new Set<HeaderColumn>(this._headerState.selectedSorts);
        this.fieldsGroup.forEach(fieldGroup => fieldGroup.fields.forEach(header => headersWithSortState.add(header)));
        headersWithSortState.forEach(header => header.sortDirection = '');

        if (!preferredSorts) {
            this._headerState.updateSelectedSorts([]);
            this.applySelectedSorts();
            return;
        }
        const headersByUniqueId = new Map<string, HeaderColumn>();
        this.fieldsGroup.forEach(fieldGroup => fieldGroup.fields.forEach(header => {
            if (!headersByUniqueId.has(header.uniqueId)) {
                headersByUniqueId.set(header.uniqueId, header);
            }
        }));
        const resolvedSorts = preferredSorts
            .map(preference => ({
                header: headersByUniqueId.get(preference.headerUniqueId),
                direction: preference.sortDirection
            }))
            .filter((resolved): resolved is {header: HeaderColumn; direction: SortDirection} => !!resolved.header);
        const applicableSorts = this._sortingMode === HeaderSortingMode.SINGLE
            ? resolvedSorts.slice(0, 1)
            : resolvedSorts;
        applicableSorts.forEach(sort => sort.header.sortDirection = sort.direction);
        const newSorts = applicableSorts.map(sort => sort.header);
        this._headerState.updateSelectedSorts(newSorts);
        this.applySelectedSorts();
    }

    protected abstract createMetaHeaders(): Array<HeaderColumn>;

    /**
     * Change sort mode for selected column all other column are set to default sort mode
     * Emit request for sorted panels
     * @param columnIndex index of the column that caused the sort change
     * @param active Represents column identifier
     * @param direction Represent one of sort modes: asd, desc and ''
     */
    public sortHeaderChanged(columnIndex: number, active: string, direction: SortDirection): void {
        const selectedHeaders = this.headerState.selectedHeaders.filter(header => !!header);
        const sortingHeader = selectedHeaders.find(header => header.uniqueId === active);
        const headersWithSortState = new Set<HeaderColumn>([
            ...selectedHeaders,
            ...this._headerState.selectedSorts
        ]);
        headersWithSortState.forEach(header => header.sortDirection = header === sortingHeader ? direction : '');
        this._headerState.updateSelectedSorts(sortingHeader && direction ? [sortingHeader] : []);

        const sortChangeDescription: SortChangeDescription = sortingHeader ? {
            sortDirection: direction,
            columnType: sortingHeader.type,
            fieldIdentifier: sortingHeader.fieldIdentifier,
            petriNetIdentifier: sortingHeader.petriNetIdentifier,
            columnIdentifier: columnIndex,
            fieldType: sortingHeader.fieldType
        } : undefined;
        this._headerChange$.next({
            headerType: this.headerType,
            changeType: HeaderChangeType.SORT,
            description: sortChangeDescription
        });
    }

    /**
     * Saves the search value in the appropriate column in the header
     * Emit request for searched panels by user input query
     */
    public headerSearchInputChanged(columnIndex: number, searchInput: any) {
        const affectedHeader = this.headerState.selectedHeaders[columnIndex];
        affectedHeader.searchInput = searchInput;
        const searchChangeDescription: SearchChangeDescription = {
            fieldIdentifier: affectedHeader.fieldIdentifier,
            fieldType: affectedHeader.fieldType,
            fieldTitle: affectedHeader.title,
            searchInput,
            type: affectedHeader.type,
            petriNetIdentifier: affectedHeader.petriNetIdentifier,
            columnIdentifier: columnIndex
        };
        this._headerChange$.next({
            headerType: this.headerType,
            changeType: HeaderChangeType.SEARCH,
            description: searchChangeDescription
        });
    }

    /**
     * Change active header and titles of panels
     */
    public headerColumnSelected(columnIndex: number, newHeaderColumn: HeaderColumn): void {
        const newHeaders: Array<HeaderColumn> = [];
        newHeaders.push(...this._headerState.selectedHeaders);
        const previousHeader = newHeaders[columnIndex];
        newHeaders[columnIndex] = newHeaderColumn;
        if (!!previousHeader && !newHeaders.includes(previousHeader)) {
            previousHeader.sortDirection = '';
            previousHeader.searchInput = undefined;
            this._headerState.updateSelectedSorts(
                this._headerState.selectedSorts.filter(header => header !== previousHeader)
            );
        }
        this._headerState.updateSelectedHeaders(newHeaders);
        this._headerChange$.next({
            headerType: this.headerType,
            changeType: HeaderChangeType.EDIT,
            description: {preferredHeaders: this._headerState.selectedHeaders}
        });
    }

    public sortingColumnSelected(newHeaderColumn: HeaderColumn | null | undefined): void {
        if (!newHeaderColumn) {
            return;
        }

        const multiSelection = this._sortingMode === HeaderSortingMode.MULTI ||
            (this._sortingMode === HeaderSortingMode.COMBINED && this._headerState.mode === HeaderMode.EDIT);
        const newSortingHeaders = multiSelection ?
            this._headerState.selectedSorts.filter(header => header.uniqueId !== newHeaderColumn.uniqueId) : [];
        this._headerState.selectedSorts
            .filter(header => header !== newHeaderColumn &&
                (!multiSelection || header.uniqueId === newHeaderColumn.uniqueId))
            .forEach(header => header.sortDirection = '');

        if (!!newHeaderColumn.sortDirection) {
            newSortingHeaders.push(newHeaderColumn);
        }
        this._headerState.updateSelectedSorts(newSortingHeaders);
    }

    /**
     * Change selected header mode there are three possible modes: SORT, SEARCH and EDIT
     * @param newMode the mode that the header should change to
     * @param saveLastMode whether the last state should be remembered.
     * It can be restored with the [HeaderState.restoreLastMode()]{@link HeaderState#restoreLastMode} method.
     */
    public changeMode(newMode: HeaderMode, saveLastMode = true): void {
        if (newMode === this._headerState.mode) {
            return;
        }

        if (saveLastMode) {
            this._headerState.saveState();
            this.saveState();
        }

        const change = this.modeChangeFromCurrent(newMode);
        this._headerState.mode = newMode;
        this._headerChange$.next(change);
    }

    public confirmEditMode(): void {
        this._headerState.restoreLastMode();
        this.saveNewState();
        const change = this.modeChangeAfterEdit();
        const viewId = this.getViewId();
        if (!!viewId) {
            const headers = this.headerState.selectedHeaders;
            const sorts = this.headerState.selectedSorts;
            this._preferences.setHeadersAndSorts(viewId, headers.map(header => !!header ? header.uniqueId : ''), sorts.map(sort => {
                return {headerUniqueId: sort.uniqueId, sortDirection: sort.sortDirection} as SortingHeader;
            }));
        }
        this.applySelectedSorts();
        this._headerChange$.next(change);
    }

    public updateSortMode(): void {
        const change = this.modeChangeAfterSort();
        this.applySelectedSorts();
        this._headerChange$.next(change);
    }

    /**
     * When user cancels the edit mode, the last saved headers state is loaded and emitted
     * Last mode in header is reloaded as well. Possible reloaded modes: sort or search
     */
    public revertEditMode(): void {
        this._headerState.restoreLastState();
        this.restoreLastState();
        this.applySelectedSorts();
        const change = this.modeChangeAfterEdit();
        this._headerChange$.next({
            headerType: this.headerType,
            changeType: HeaderChangeType.EDIT,
            description: {preferredHeaders: this._headerState.selectedHeaders}
        });
        this._headerChange$.next(change);
    }

    ngOnDestroy(): void {
        this._headerChange$.complete();
        this._appliedSorts$.complete();
        this._clearHeaderSearch$.complete();
        this._headerColumnCount$.complete();
        this._responsiveHeaders$.complete();
        this.loading.complete();
        this._preferenceColumnCount$.complete();
    }

    /**
     * @param newMode the {@link HeaderMode} that is being selected as the next mode
     * @returnsa {@link HeaderChange} object with {@link ModeChangeDescription} object as it's `description`,
     * where the `previousMode` is set to the currently selected mode and the `currentMode` is set to the provided argument
     */
    protected modeChangeFromCurrent(newMode: HeaderMode): HeaderChange {
        return this.createModeChange(this._headerState.mode, newMode);
    }

    /**
     * @returns a {@link HeaderChange} object with {@link ModeChangeDescription} object as it's `description`,
     * where the `previousMode` is set to [EDIT]{@link HeaderMode#EDIT} and the `currentMode` to the mode
     * that is currently selected
     */
    protected modeChangeAfterEdit(): HeaderChange {
        return this.createModeChange(HeaderMode.EDIT, this._headerState.mode);
    }

    protected modeChangeAfterSort(): HeaderChange {
        return this.createModeChange(HeaderMode.SORT, this._headerState.mode);
    }

    /**
     * @param oldMode the {@link HeaderMode} that was previously selected
     * @param newMode the {@link HeaderMode} that is selected now
     * @returns a {@link HeaderChange} object with {@link ModeChangeDescription} object as it's `description`
     * containing information about a change to the header mode
     */
    protected createModeChange(oldMode: HeaderMode, newMode: HeaderMode): HeaderChange {
        return {
            changeType: HeaderChangeType.MODE_CHANGED,
            description: {
                currentMode: newMode,
                previousMode: oldMode
            },
            headerType: this.headerType
        };
    }

    /**
     * Emits a snapshot of the currently selected sorting so registered views can reload without persisting user preferences.
     */
    public applySelectedSorts(): void {
        const appliedSorts = this._headerState.selectedSorts.map(header => {
            const snapshot = new HeaderColumn(header.type, header.fieldIdentifier, header.title, header.fieldType,
                header.initial, header.petriNetIdentifier);
            snapshot.sortDirection = header.sortDirection;
            return snapshot;
        });
        this._appliedSorts$.next(appliedSorts);
    }

    /**
     * Emits a new value into the [clearHeaderSearch$]{@link AbstractHeaderService#clearHeaderSearch$} stream, that notifies
     * the header search component, that it should clear the input for the specified column.
     * @param columnIndex the index of the column that should be cleared
     */
    public clearHeaderSearch(columnIndex: number): void {
        this._clearHeaderSearch$.next(columnIndex);
    }

    /**
     * @returns the Id of the view, if the ViewIdService was injected. Returns `undefined` if the service was not injected.
     */
    protected getViewId(): string | undefined {
        if (this._viewIdService) {
            return this._viewIdService.viewId;
        }
        return undefined;
    }

    protected abstract saveState();

    protected abstract saveNewState();

    protected abstract restoreLastState();
}
