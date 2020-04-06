import {NewCaseComponent} from '../../side-menu/new-case/new-case.component';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {Case} from '../../resources/interface/case';
import {Observable, ReplaySubject} from 'rxjs';
import {HeaderComponent} from '../../header/header.component';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {HeaderChange} from '../../header/models/user-changes/header-change';
import {HeaderType} from '../../header/models/header-type';
import {SelectedHeaderField} from '../../header/models/selected-header-field';
import {SortChangeDescription} from '../../header/models/user-changes/sort-change-description';
import {HttpParams} from '@angular/common/http';
import {HeaderMode} from '../../header/models/header-mode';


export abstract class AbstractCaseView {

    public readonly headerType: HeaderType = HeaderType.CASE;
    public cases: Array<Case> = [];
    public featuredFields$: ReplaySubject<Array<SelectedHeaderField>>;
    private _changeHeader$: Observable<HeaderChange>;
    public loading: boolean;

    protected constructor(protected _sideMenuService: SideMenuService,
                          protected _caseResourceService: CaseResourceService,
                          protected _baseFilter: string = '{}') {
        this.loading = true;
        this._caseResourceService.getAllCase()
            .subscribe((newCases: Array<Case>) => {
                this.updateCases(newCases);
                this.loading = false;
            });
        this.featuredFields$ = new ReplaySubject<Array<SelectedHeaderField>>(1);
    }

    public createNewCase(): void {
        this._sideMenuService.open(NewCaseComponent);
    }

    protected initializeHeader(caseHeaderComponent: HeaderComponent): void {
        // caseHeaderComponent.headerService.selectedHeaders$.subscribe(featuredFields => this.featuredFields$.next(featuredFields));
        caseHeaderComponent.headerService.headerChange$.subscribe((header: HeaderChange) => {
            if (!header) {
                return;
            }
            let params: HttpParams = new HttpParams();
            if (header.mode === HeaderMode.SORT) {
                const desc = header.description as SortChangeDescription;
                if (desc.sortDirection !== '') {
                    params = params.set(header.mode, `${desc.fieldIdentifier},${desc.sortDirection}`);
                }
            }
            // const params = new HttpParams().set(header ? header.type : '',
            //     header.description.sortMode && header.description.identifier ?
            //     header.description.sortMode + header.description.identifier : '');
            // const params = new HttpParams().set('sort', 'asc');
            this.loading = true;
            this._caseResourceService.searchCases({}, params)
                .subscribe((newCases: Array<Case>) => {
                    this.updateCases(newCases);
                    this.loading = false;
                });
            // TODO if headers changed their content (different columns should be shown) update featured fields stream
        });
    }

    protected updateCases(newCases: Array<Case>): void {
        // TODO is just replacing the existing cases with new ones a good idea? Is there some data, we might loose?
        this.cases.splice(0, this.cases.length);
        if (!!newCases && Array.isArray(newCases)) {
            this.cases.push(...newCases);
        }
    }

    public abstract handleCaseClick(clickedCase: Case): void;
}
