import {Injectable} from '@angular/core';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {Case} from '../../resources/interface/case';
import {NewCaseComponent} from '../../side-menu/content-components/new-case/new-case.component';
import {CaseMetaField} from '../../header/case-header/case-header.service';
import {SortableView} from '../abstract/sortable-view';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {SearchService} from '../../search/search-service/search.service';
import {Net} from '../../process/net';
import {CaseParams} from './case-params';
import {ProcessService} from '../../process/process.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {SideMenuSize} from '../../side-menu/models/side-menu-size';


@Injectable()
export class CaseViewService extends SortableView {

    protected _loading$: BehaviorSubject<boolean>;
    protected _cases$: Subject<Array<Case>>;
    protected _allowedNets$: ReplaySubject<Array<Net>>;

    constructor(allowedNets: Observable<Array<Net>>,
                protected _sideMenuService: SideMenuService,
                protected _caseResourceService: CaseResourceService,
                protected _log: LoggerService,
                protected _snackBarService: SnackBarService,
                protected _searchService: SearchService,
                protected _viewParams?: CaseParams) {
        super();
        this._loading$ = new BehaviorSubject<boolean>(false);
        this._cases$ = new Subject<Array<Case>>();
        this._searchService.activeFilter$.subscribe( () => {
            this.reload();
        });
        this._allowedNets$ = new ReplaySubject<Array<Net>>(1);
        allowedNets.subscribe( nets => {
            this._allowedNets$.next(nets);
        });
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

    public get cases$(): Observable<Array<Case>> {
        return this._cases$.asObservable();
    }

    public get allowedNets$(): Observable<Array<Net>> {
        return this._allowedNets$.asObservable();
    }

    public loadCases(): void {
        if (this.loading) {
            return;
        }
        this.setLoading(true);

        let params: HttpParams = new HttpParams();
        params = this.addSortParams(params);
        this._caseResourceService.searchCases(this._searchService.activeFilter, params)
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
        this._sideMenuService.open(NewCaseComponent, SideMenuSize.MEDIUM, {allowedNets$: this.allowedNets$}).onClose.subscribe($event => {
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
