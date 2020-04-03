import {Observable, Subject} from 'rxjs';
import {FieldsGroup} from './models/fields-group';
import {HeaderState} from './header-state';
import {OnDestroy} from '@angular/core';
import {SortChangeDescription} from './models/user-changes/sort-change-description';
import {SearchChangeDescription} from './models/user-changes/search-change-description';
import {EditChangeDescription} from './models/user-changes/edit-change-description';
import {HeaderChange} from './models/user-changes/header-change';
import {DataDescription} from './models/data-description';
import {PetriNetReference} from '../resources/interface/petri-net-reference';
import {HeaderType} from './models/header-type';
import {HeaderMode} from './models/header-mode';
import {HeaderColumn, HeaderColumnType} from './models/header-column';
import {SortDirection} from '@angular/material';

export type HeaderChangeDescription = SortChangeDescription | SearchChangeDescription | EditChangeDescription;

const MAX_HEADER_COLUMNS = 5;

export abstract class AbstractHeaderService implements OnDestroy {

    public fieldsGroup: Array<FieldsGroup>;

    protected _headerState: HeaderState;
    protected _headerChange$: Subject<HeaderChange>;

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

    get headerState(): HeaderState {
        return this._headerState;
    }

    get headerType(): HeaderType {
        return this._headerType;
    }

    private initializeHeaderState(): void {
        const defaultHeaders = [].fill(null, 0, MAX_HEADER_COLUMNS);
        for (let i = 0; i < this.fieldsGroup[0].fields.length && i < MAX_HEADER_COLUMNS; i++) {
            defaultHeaders[i] = this.fieldsGroup[0].fields[i];
        }
        this._headerState = new HeaderState(defaultHeaders);
    }

    public setAllowedNets(allowedNets: Array<PetriNetReference>) {
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
        });
    }

    protected abstract createMetaHeaders(): Array<HeaderColumn>;

    /**
     * Change sort mode for selected column all other column are set to default sort mode
     * Emit request for sorted panels
     * @param active Represents column identifier
     * @param direction Represent one of sort modes: asd, desc and ''
     */
    public sortHeaderChanged(active: string, direction: SortDirection): HeaderState {
        let sortChangeDescription: SortChangeDescription;
        Object.keys(this.headerState.selectedHeaders$).forEach(columnId => {
            if (columnId === active) {
                sortChangeDescription = {
                    columnId,
                    identifier: this.headerState.selectedHeaders$[columnId].identifier,
                    sortMode: direction,
                    title: this.headerState.selectedHeaders$[columnId].title,
                    type: this.headerState.selectedHeaders$[columnId].type
                };
                this.headerState.selectedHeaders$[columnId].sortMode = direction;
            } else {
                this.headerState.selectedHeaders$[columnId].sortMode = '';
            }
        });
        // TODO pair the search request with the back-end and then return the searched petri net models
        this._headerChange$.next({headerType: this.headerType, type: HeaderMode.SORT, description: sortChangeDescription});
        return this.headerState;
    }

    /**
     * Saves the search value in the appropriate column in the header
     * Emit request for searched panels by user input query
     * @param columnId Identifier of column where is search input placed
     * @param searchedQuery User-written value for search
     */
    public onUserSearch(columnId: string, searchedQuery: any): HeaderState {
        this.headerState.selectedHeaders$[columnId].searchQuery = searchedQuery;
        const searchChangeDescription: SearchChangeDescription = {
            columnId,
            identifier: this.headerState.selectedHeaders$[columnId].identifier,
            searchQuery: searchedQuery,
            title: this.headerState.selectedHeaders$[columnId].title,
            type: this.headerState.selectedHeaders$[columnId].type
        };
        // TODO pair the search request with the back-end and then return the searched petri net models
        this._headerChange$.next({
            headerType: this.headerType,
            type: HeaderMode.SEARCH,
            description: searchChangeDescription
        });
        return this.headerState;
    }

    /**
     * Change active header and titles of panels
     * @param columnId Identifier of selected column
     * @param groupType Divides whether the header is from immediate or meta data
     * @param field Description of data field contains title, string id and  data type
     */
    public onColumnEdit(columnId: string, groupType: string, field: DataDescription): HeaderState {
        this._headerState.selectedHeaders$[columnId] = {
            type: groupType === 'META DATA' ? 'meta' : 'immediate',
            identifier: field.stringId,
            title: field.title,
            sortMode: '',
            searchQuery: '',
            columnId,
            fieldType: field.type
        };
        // TODO pair the search request with the back-end and then return the searched petri net models
        this._headerChange$.next({
            headerType: this.headerType,
            type: HeaderMode.EDIT,
            description: {preferredHeaders: null /*this.headerState.selectedHeaders$ */}
        });
        return this._headerState;
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
            type: HeaderMode.EDIT,
            description: {preferredHeaders: null /*this._headerState.selectedHeaders$*/}
        });
    }

    ngOnDestroy(): void {
        this._headerChange$.complete();
    }
}
