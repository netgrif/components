import {Injectable} from '@angular/core';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {SideMenuSize} from '../../side-menu/models/side-menu-size';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {Case} from '../../resources/interface/case';
import {NewCaseComponent} from '../../side-menu/content-components/new-case/new-case.component';
import {CaseMetaField} from '../../header/case-header/case-header.service';
import {SortableView} from '../abstract/sortable-view';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/snack-bar.service';
import {HeaderMode} from '../../header/models/header-mode';
import {HeaderChange} from '../../header/models/user-changes/header-change';
import {SortChangeDescription} from '../../header/models/user-changes/sort-change-description';


@Injectable()
export class CaseViewService extends SortableView {

    protected _loading$: BehaviorSubject<boolean>;
    protected _baseFilter: string;
    protected _cases$: Subject<Array<Case>>;

    constructor(protected _sideMenuService: SideMenuService,
                protected _caseResourceService: CaseResourceService,
                protected _log: LoggerService,
                protected _snackBarService: SnackBarService) {
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
                if (newCases instanceof Array) {
                    this.updateCases(newCases);
                } else {
                    this._snackBarService.openInfoSnackBar('No resource for cases was found');
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

    /**
     * injectionData [] no filter
     * ['AA'] identifier
     */
    public createNewCase(): void {
        this._sideMenuService.open(NewCaseComponent, SideMenuSize.MEDIUM, ['CCC', 'AA']).onClose.subscribe($event => {
            this._log.debug($event.message, $event.data);
            if ($event.data) {
                this.loadCases();
            }
        });
    }

    // USER?
    // public hasAutority(): boolean {
    //     if (!this.authorityToCreate || !this._user || !this._user.authorities) return false;
    //     if (this.authorityToCreate instanceof Array) {
    //         return this.authorityToCreate.some(a => this._user.authorities.some(u => u === a));
    //     }
    // }


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

    public reload(): void {
        this.loadCases();
    }

}
