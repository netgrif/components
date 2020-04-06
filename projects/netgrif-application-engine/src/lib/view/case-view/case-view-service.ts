import {Injectable} from '@angular/core';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {SortChangeDescription} from '../../header/models/user-changes/sort-change-description';
import {Case} from '../../resources/interface/case';
import {NewCaseComponent} from '../../side-menu/new-case/new-case.component';
import {HeaderChange} from '../../header/models/user-changes/header-change';
import {HeaderMode} from '../../header/models/header-mode';

@Injectable()
export class CaseViewService {

    protected _loading$: BehaviorSubject<boolean>;
    protected _baseFilter: string;
    protected _lastHeaderSearchState: SortChangeDescription;
    protected _cases$: Subject<Array<Case>>;

    constructor(protected _sideMenuService: SideMenuService,
                protected _caseResourceService: CaseResourceService) {
        this._baseFilter = '{}';
        this._loading$ = new BehaviorSubject<boolean>(false);
        this._cases$ = new Subject<Array<Case>>();
        this._lastHeaderSearchState = {
            columnType: undefined,
            fieldIdentifier: '',
            sortDirection: '',
        };
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
        if (this._lastHeaderSearchState.sortDirection !== '') {
            params = params.set('sort', `${this._lastHeaderSearchState.fieldIdentifier},${this._lastHeaderSearchState.sortDirection}`);
        }
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

    public registerHeaderChange(headerChange$: Observable<HeaderChange>): void {
        headerChange$.subscribe((header: HeaderChange) => {
            if (!header) {
                return;
            }
            if (header.mode === HeaderMode.SORT || header.mode === HeaderMode.SEARCH) {
                if (header.mode === HeaderMode.SORT) {
                    this._lastHeaderSearchState = header.description as SortChangeDescription;
                }
                // TODO we might not need to search all the time, do some filtering
                this.loadCases();
            }
        });
    }

}
