import {BehaviorSubject, Observable} from "rxjs";
import {FieldsGroup} from "./models/fields-group";
import {fieldsGroup} from "./header-modes/edit-mode/fields.group";
import {DataType} from "./models/column";
import {PreferredHeaders} from "./models/preferred-headers";
import {PetriNetReference} from "./models/petri-net-reference";
import {Headers} from './headers';

/**
 * Definition of emitted data when user change sort mode on column
 */
export interface SortChangeDescription {
    columnId: string;
    identifier: string;
    title: string;
    sortMode: string;
    type: DataType;
}

/**
 * Definition of emitted data when user type in search input
 */
export interface SearchChangeDescription {
    columnId: string;
    identifier: string;
    title: string;
    searchQuery: string;
    type: DataType;
}

/**
 * Definition of emitted data when edit preferred headers
 */
export interface EditChangeDescription {
    preferredHeaders: PreferredHeaders;
}

export type HeaderChangeDescription = SortChangeDescription | SearchChangeDescription | EditChangeDescription;
export type HeaderMode = 'sort' | 'search' | 'edit';
export type HeaderType = 'workflow' | 'case' | 'task';

export interface HeaderChange {
    type: HeaderMode,
    description: HeaderChangeDescription,
    headerType: HeaderType
}


export class AbstractHeaderService {
    protected _headers: Headers;
    protected _changeHeader$: BehaviorSubject<HeaderChange>;
    public petriNetReferences: Array<PetriNetReference>;
    public fieldsGroup: Array<FieldsGroup> = fieldsGroup;
    private _headerType: HeaderType;

    constructor(headerType: HeaderType) {
        this._changeHeader$ = new BehaviorSubject<HeaderChange>(null);
        this.petriNetReferences = [];
        this.headerType = headerType;
    }

    get headers(): Headers {
        return this._headers;
    }

    get headerType(): "workflow" | "case" | "task" {
        return this._headerType;
    }

    set headerType(value: "workflow" | "case" | "task") {
        this._headerType = value;
    }

    public setFieldsGroupData(petriNetReferences: Array<PetriNetReference>) {
        petriNetReferences.forEach(petriNet => {
            this.fieldsGroup.push({type: petriNet.identifier, fields: petriNet.immediateData});
        });
    }

    /**
     * Change sort mode for selected column all other column are set to default sort mode
     * Emit request for sorted panels
     * @param active Represents column identifier
     * @param direction Represent one of sort modes: asd, desc and ''
     */
    public onSortModeEdit({active, direction}): Headers {
        let sortChangeDescription: SortChangeDescription;
        Object.keys(this.headers.selected).forEach(columnId => {
            if (columnId == active) {
                sortChangeDescription = {
                    columnId: columnId,
                    identifier: this.headers.selected[columnId].identifier,
                    sortMode: direction,
                    title: this.headers.selected[columnId].title,
                    type: this.headers.selected[columnId].type
                };
                this.headers.selected[columnId].sortMode = direction;
            } else {
                this.headers.selected[columnId].sortMode = '';
            }
        });
        //TODO pair the search request with the back-end and then return the searched petri net models
        this._changeHeader$.next({headerType: this.headerType, type: "sort", description: sortChangeDescription});
        return this.headers
    }

    /**
     * Saves the search value in the appropriate column in the header
     * Emit request for searched panels by user input query
     * @param columnId Identifier of column where is search input placed
     * @param searchedQuery User-written value for search
     */
    public onUserKeyupSearch(columnId: string, searchedQuery: any): Headers {
        this.headers.selected[columnId].searchQuery = searchedQuery;
        let searchChangeDescription: SearchChangeDescription = {
            columnId: columnId,
            identifier: this.headers.selected[columnId].identifier,
            searchQuery: searchedQuery,
            title: this.headers.selected[columnId].title,
            type: this.headers.selected[columnId].type
        };
        //TODO pair the search request with the back-end and then return the searched petri net models
        this._changeHeader$.next({
            headerType: this.headerType,
            type: "search",
            description: searchChangeDescription
        });
        return this.headers;
    }

    /**
     * Change active header and and titles of panels
     * @param columnId Identifier of selected column
     * @param groupType Divides whether the header is from immediate or meta data
     * @param stringId
     * @param title
     */
    public onColumnEdit(columnId: string, groupType: string, stringId: string, title: string): Headers {
        this._headers.selected[columnId] = {
            type: groupType == 'META DATA' ? 'meta' : 'immediate',
            identifier: stringId,
            title: title,
            sortMode: '',
            searchQuery: '',
            columnId: columnId
        };
        //TODO pair the search request with the back-end and then return the searched petri net models
        this.setWorkflowPanelTitles();
        this._changeHeader$.next({
            headerType: this.headerType,
            type: "edit",
            description: {preferredHeaders: this.headers.selected}
        });
        return this._headers;
    }

    public setWorkflowPanelTitles(): void {
    }

    /**
     * Change selected header mode there are three possible modes: SORT, SEARCH and EDIT
     * @param newMode
     * @param saveLastMode
     */
    public changeMode(newMode: HeaderMode, saveLastMode = true): void {
        if (saveLastMode) {
            this._headers.lastMode = this._headers.mode;
            this._headers.lastSelected = Object.assign({}, this._headers.selected)
        }

        this._headers.mode = newMode;
    }

    public confirmEditMode(): void {
        this._headers.mode = this._headers.lastMode
    }

    /**
     * When user cancels the edit mode, the last saved headers state is loaded and emitted
     * Last mode in header is reloaded as well. Possible reloaded modes: sort or search
     */
    public revertEditMode(): void {
        this._headers.mode = this._headers.lastMode;
        this._headers.selected = this._headers.lastSelected;
        //TODO pair the search request with the back-end and then return the searched petri net models
        this._changeHeader$.next({
            headerType: this.headerType,
            type: "edit",
            description: {preferredHeaders: this._headers.selected}
        });
    }

    get headerChange$(): Observable<HeaderChange> {
        return this._changeHeader$.asObservable();
    }

    ngOnDestroy(): void {
        this._changeHeader$.complete();
    }
}
