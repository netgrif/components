import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {FieldsGroup} from './models/fields-group';
import {HeaderState, HeaderStateInterface} from './header-state';
import {Component, Injectable, OnDestroy, Optional} from '@angular/core';
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

@Injectable()
export abstract class AbstractHeaderService implements OnDestroy {

    public static readonly DEFAULT_HEADER_COUNT = 5;
    public static readonly DEFAULT_HEADER_RESPONSIVITY = true;

    protected _headerColumnCount$: BehaviorSubject<number>;
    protected _preferenceColumnCount$: ReplaySubject<number>;
    protected _responsiveHeaders$: BehaviorSubject<boolean>;
    protected _headerState: HeaderState;
    protected _headerChange$: Subject<HeaderChange>;
    protected _clearHeaderSearch$: Subject<number>;
    private _initDefaultHeaders: Array<string>;
    private _initializedCount: boolean;

    public loading: LoadingEmitter;
    public fieldsGroup: Array<FieldsGroup>;

    protected constructor(protected _headerType: HeaderType,
                          protected _preferences: UserPreferenceService,
                          @Optional() private _viewIdService: ViewIdService,
                          protected _logger: LoggerService) {
        this.loading = new LoadingEmitter(true);
        this._headerChange$ = new Subject<HeaderChange>();
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

    get headerState(): HeaderStateInterface {
        return this._headerState.asInterface();
    }

    get headerType(): HeaderType {
        return this._headerType;
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
    }

    /**
     * Adds `null` headers if the new count is greater than the current count.
     *
     * Removes extra headers if the new count is smaller than the current count.
     */
    protected updateHeaderColumnCount(): void {
        let headers = this._headerState.selectedHeaders;
        if (headers.length < this.headerColumnCount) {
            while (headers.length !== this.headerColumnCount) {
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

    protected abstract createMetaHeaders(): Array<HeaderColumn>;

    /**
     * Change sort mode for selected column all other column are set to default sort mode
     * Emit request for sorted panels
     * @param columnIndex index of the column that caused the sort change
     * @param active Represents column identifier
     * @param direction Represent one of sort modes: asd, desc and ''
     */
    public sortHeaderChanged(columnIndex: number, active: string, direction: SortDirection): void {
        let sortChangeDescription: SortChangeDescription;
        let foundFirstMatch = false; // column can feature in the header in multiple positions => we don't want to send multiple events
        this.headerState.selectedHeaders.filter(header => !!header).forEach(header => {
            if (header.uniqueId === active && !foundFirstMatch) {
                sortChangeDescription = {
                    sortDirection: direction,
                    columnType: header.type,
                    fieldIdentifier: header.fieldIdentifier,
                    petriNetIdentifier: header.petriNetIdentifier,
                    columnIdentifier: columnIndex,
                    fieldType: header.fieldType
                };
                header.sortDirection = direction;
                foundFirstMatch = true;
            } else {
                header.sortDirection = '';
            }
        });
        this._headerChange$.next({headerType: this.headerType, changeType: HeaderChangeType.SORT, description: sortChangeDescription});
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
        if (!!newHeaders[columnIndex]) {
            newHeaders[columnIndex].sortDirection = '';
            newHeaders[columnIndex].searchInput = undefined;
        }
        newHeaders[columnIndex] = newHeaderColumn;
        this._headerState.updateSelectedHeaders(newHeaders);
        this._headerChange$.next({
            headerType: this.headerType,
            changeType: HeaderChangeType.EDIT,
            description: {preferredHeaders: this._headerState.selectedHeaders}
        });
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
            this._preferences.setHeaders(viewId, headers.map(header => !!header ? header.uniqueId : ''));
        }
        this._headerChange$.next(change);
    }

    /**
     * When user cancels the edit mode, the last saved headers state is loaded and emitted
     * Last mode in header is reloaded as well. Possible reloaded modes: sort or search
     */
    public revertEditMode(): void {
        this._headerState.restoreLastState();
        this.restoreLastState();
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
