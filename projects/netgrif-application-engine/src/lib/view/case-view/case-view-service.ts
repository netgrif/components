import {Injectable} from '@angular/core';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {Case} from '../../resources/interface/case';
import {NewCaseComponent} from '../../side-menu/new-case/new-case.component';
import {CaseMetaField} from '../../header/case-header/case-header.service';
import {SortableViewService} from '../abstract/sortable-view-service';

@Injectable()
export class CaseViewService extends SortableViewService {

    protected _loading$: BehaviorSubject<boolean>;
    protected _baseFilter: string;
    protected _cases$: Subject<Array<Case>>;

    constructor(protected _sideMenuService: SideMenuService,
                protected _caseResourceService: CaseResourceService) {
        super();
        this._baseFilter = '{}';
        this._loading$ = new BehaviorSubject<boolean>(false);
        this._cases$ = new Subject<Array<Case>>();
    }

    public get loading(): boolean {
        return this._loading$.getValue();
    }

    protected setLoading(loading: boolean): void {
        this._loading$.next(loading);
    }

    public get loading$(): Observable<boolean> {
        return this._loading$.asObservable();
    }

    public set baseFilter(newFilter: string) {
        this._baseFilter = newFilter;
    }

    public get cases$(): Observable<Array<Case>> {
        return this._cases$.asObservable();
    }

    public loadCases(): void {
        if (this.loading) {
            return;
        }
        this.setLoading(true);

        let params: HttpParams = new HttpParams();
        params = this.addSortParams(params);
        this._caseResourceService.searchCases(JSON.parse(this._baseFilter), params)
            .subscribe((newCases: Array<Case>) => {
                this.updateCases(newCases);
                this.setLoading(false);
            });
    }

    protected updateCases(newCases: Array<Case>): void {
        this._cases$.next(newCases);
    }

    public createNewCase(): void {
        this._sideMenuService.open(NewCaseComponent);
    }

    protected getDefaultSortParam(): string {
        return 'stringId,desc';
    }

    protected getMetaFieldSortId(): string {
        switch (this._lastHeaderSearchState.fieldIdentifier) {
            case CaseMetaField.TITLE:
                return 'titleSortable';
            case CaseMetaField.CREATION_DATE:
                return 'creationDateSortable';
            default:
                return this._lastHeaderSearchState.fieldIdentifier;
        }
    }

    public reload(): void {
        this.loadCases();
    }

}
