import {Injectable} from '@angular/core';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {Case} from '../../resources/interface/case';
import {NewCaseComponent} from '../../side-menu/content-components/new-case/new-case.component';
import {CaseMetaField} from '../../header/case-header/case-header.service';
import {SortableView} from '../abstract/sortable-view';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {Filter} from '../../filter/models/filter';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {FilterType} from '../../filter/models/filter-type';


@Injectable()
export class CaseViewService extends SortableView {

    protected _loading$: BehaviorSubject<boolean>;
    protected _baseFilter: Filter;
    protected _cases$: Subject<Array<Case>>;

    constructor(protected _sideMenuService: SideMenuService,
                protected _caseResourceService: CaseResourceService,
                protected _log: LoggerService,
                protected _snackBarService: SnackBarService) {
        super();
        this._baseFilter = new SimpleFilter('', FilterType.CASE, {});
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

    public set baseFilter(newFilter: Filter) {
        this._baseFilter = newFilter.clone();
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
        this._caseResourceService.searchCases(this._baseFilter, params)
            .subscribe((newCases: Array<Case>) => {
                if (newCases instanceof Array) {
                    this.updateCases(newCases);
                } else {
                    this._snackBarService.openWarningSnackBar('No resource for cases was found');
                }
                this.setLoading(false);
            }, error => {
                this._snackBarService.openErrorSnackBar('Getting cases failed');
                this._log.error(error);
                this.setLoading(false);
            });
    }

    protected updateCases(newCases: Array<Case>): void {
        this._cases$.next(newCases);
    }

    public createNewCase(): void {
        // TODO 16.4. 2020 Add filter to injected data for newCase Component to get there allowedNets
        this._sideMenuService.open(NewCaseComponent).onClose.subscribe($event => {
            this._log.debug($event.message, $event.data);
            if ($event.data) {
                this.loadCases();
            }
        });
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
