import {Observable, Subject} from 'rxjs';
import {FieldsGroup} from './models/fields-group';
import {HeaderState, HeaderStateInterface} from './header-state';
import {OnDestroy} from '@angular/core';
import {SortChangeDescription} from './models/user-changes/sort-change-description';
import {SearchChangeDescription} from './models/user-changes/search-change-description';
import {HeaderChange} from './models/user-changes/header-change';
import {PetriNetReference} from '../resources/interface/petri-net-reference';
import {HeaderType} from './models/header-type';
import {HeaderMode} from './models/header-mode';
import {HeaderColumn, HeaderColumnType} from './models/header-column';
import {SortDirection} from '@angular/material';
import {UserPreferenceService} from '../user/services/user-preference.service';
import {ViewService} from '../routing/view-service/view.service';
import {LoggerService} from '../logger/services/logger.service';
import {LoadingEmitter} from '../utility/loading-emitter';
import {HeaderChangeType} from './models/user-changes/header-change-type';

export abstract class AbstractHeaderService implements OnDestroy {

    protected MAX_HEADER_COLUMNS = 5;
    protected _responsiveHeaders = true;
    protected _headerState: HeaderState;
    protected _headerChange$: Subject<HeaderChange>;

    public loading: LoadingEmitter;
    public fieldsGroup: Array<FieldsGroup>;

    protected constructor(private _headerType: HeaderType,
                          private _preferences: UserPreferenceService,
                          private _viewService: ViewService,
                          private _logger: LoggerService) {
        this.loading = new LoadingEmitter(true);
        this._headerChange$ = new Subject<HeaderChange>();
        this.fieldsGroup = [{groupTitle: 'Meta data', fields: this.createMetaHeaders()}];
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

    get maxHeaderColumns(): number {
        return this.MAX_HEADER_COLUMNS;
    }

    set maxHeaderColumns(maxColumns: number) {
        this.MAX_HEADER_COLUMNS = maxColumns;
        this.initializeHeaderState();
    }

    get responsiveHeaders(): boolean {
        return this._responsiveHeaders;
    }

    set responsiveHeaders(responsiveHeaders: boolean) {
        this._responsiveHeaders = responsiveHeaders;
    }

    private static uniqueNetFieldID(netId: string, fieldId: string): string {
        return `${netId}-${fieldId}`;
    }

    private initializeHeaderState(): void {
        const defaultHeaders = [];
        for (let i = 0; i < this.MAX_HEADER_COLUMNS; i++) {
            defaultHeaders.push(null);
        }
        for (let i = 0; i < this.fieldsGroup[0].fields.length && i < this.MAX_HEADER_COLUMNS; i++) {
            defaultHeaders[i] = this.fieldsGroup[0].fields[i];
        }
        this._headerState = new HeaderState(defaultHeaders);
    }

    protected initializeDefaultHeaderState(naeDefaultHeaders: Array<string>): void {
        if (naeDefaultHeaders && Array.isArray(naeDefaultHeaders)) {
            const defaultHeaders = [];
            for (let i = 0; i < this.MAX_HEADER_COLUMNS; i++) {
                defaultHeaders.push(null);
            }
            naeDefaultHeaders.forEach((headerId, i) => {
                let head;
                for (const h of this.fieldsGroup) {
                    head = h.fields.find(header => header.uniqueId === headerId);
                    if (head) {
                        defaultHeaders[i] = head;
                        break;
                    }
                }
            });
            this._headerState.updateSelectedHeaders(defaultHeaders);
        }
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
                    new HeaderColumn(HeaderColumnType.IMMEDIATE, immediate.stringId, immediate.title, immediate.type, allowedNet.identifier)
                );
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
        const viewId = this._viewService.getViewId();
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
        this._headerState.updateSelectedHeaders(newHeaders);
    }

    protected abstract createMetaHeaders(): Array<HeaderColumn>;

    /**
     * Change sort mode for selected column all other column are set to default sort mode
     * Emit request for sorted panels
     * @param active Represents column identifier
     * @param direction Represent one of sort modes: asd, desc and ''
     */
    public sortHeaderChanged(active: string, direction: SortDirection): void {
        let sortChangeDescription: SortChangeDescription;
        let foundFirstMatch = false; // column can feature in the header in multiple positions => we don't want to send multiple events
        this.headerState.selectedHeaders.filter(header => !!header).forEach(header => {
            if (header.uniqueId === active && !foundFirstMatch) {
                sortChangeDescription = {
                    sortDirection: direction,
                    columnType: header.type,
                    fieldIdentifier: header.fieldIdentifier,
                    petriNetIdentifier: header.petriNetIdentifier
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
            searchInput,
            type: affectedHeader.type,
            petriNetIdentifier: affectedHeader.petriNetIdentifier,
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
        }

        const change = this.modeChangeFromCurrent(newMode);
        this._headerState.mode = newMode;
        this._headerChange$.next(change);
    }

    public confirmEditMode(): void {
        this._headerState.restoreLastMode();
        const change = this.modeChangeAfterEdit();
        const viewId = this._viewService.getViewId();
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
}
