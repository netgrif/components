import {Observable, Subject} from 'rxjs';
import {FieldsGroup} from './models/fields-group';
import {HeaderState, HeaderStateInterface} from './header-state';
import {OnDestroy} from '@angular/core';
import {SortChangeDescription} from './models/user-changes/sort-change-description';
import {SearchChangeDescription} from './models/user-changes/search-change-description';
import {EditChangeDescription} from './models/user-changes/edit-change-description';
import {HeaderChange} from './models/user-changes/header-change';
import {PetriNetReference} from '../resources/interface/petri-net-reference';
import {HeaderType} from './models/header-type';
import {HeaderMode} from './models/header-mode';
import {HeaderColumn, HeaderColumnType} from './models/header-column';
import {SortDirection} from '@angular/material';


export type HeaderChangeDescription = SortChangeDescription | SearchChangeDescription | EditChangeDescription;

const MAX_HEADER_COLUMNS = 5;

export abstract class AbstractHeaderService implements OnDestroy {

    protected constructor(private _headerType: HeaderType) {
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

    public fieldsGroup: Array<FieldsGroup>;

    protected _headerState: HeaderState;
    protected _headerChange$: Subject<HeaderChange>;

    private static uniqueNetFieldID(netId: string, fieldId: string): string {
        return `${netId}-${fieldId}`;
    }

    private initializeHeaderState(): void {
        const defaultHeaders = [];
        for (let i = 0; i < MAX_HEADER_COLUMNS; i++) {
            defaultHeaders.push(null);
        }
        for (let i = 0; i < this.fieldsGroup[0].fields.length && i < MAX_HEADER_COLUMNS; i++) {
            defaultHeaders[i] = this.fieldsGroup[0].fields[i];
        }
        this._headerState = new HeaderState(defaultHeaders);
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
        this._headerChange$.next({headerType: this.headerType, mode: HeaderMode.SORT, description: sortChangeDescription});
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
            mode: HeaderMode.SEARCH,
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
            mode: HeaderMode.EDIT,
            description: {preferredHeaders: this._headerState.selectedHeaders}
        });
    }

    public setPanelsTitles(): void {
    }

    /**
     * Change selected header mode there are three possible modes: SORT, SEARCH and EDIT
     * @param newMode -
     * @param saveLastMode -
     */
    public changeMode(newMode: HeaderMode, saveLastMode = true): void {
        if (saveLastMode) {
            this._headerState.saveState();
        }

        this._headerState.mode = newMode;
    }

    public confirmEditMode(): void {
        this._headerState.restoreLastMode();
    }

    /**
     * When user cancels the edit mode, the last saved headers state is loaded and emitted
     * Last mode in header is reloaded as well. Possible reloaded modes: sort or search
     */
    public revertEditMode(): void {
        this._headerState.restoreLastState();
        this.setPanelsTitles();
        // TODO pair the search request with the back-end and then return the searched petri net models
        this._headerChange$.next({
            headerType: this.headerType,
            mode: HeaderMode.EDIT,
            description: {preferredHeaders: this._headerState.selectedHeaders}
        });
    }

    ngOnDestroy(): void {
        this._headerChange$.complete();
    }
}
