import {NewCaseComponent} from '../../side-menu/new-case/new-case.component';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {Case} from '../../resources/interface/case';
import {BehaviorSubject, Observable} from 'rxjs';
import {HeaderComponent} from '../../header/header.component';
import {HttpParams} from '@angular/common/http';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {HeaderType} from '../../header/abstract-header-service';
import {HeaderChange} from '../../header/models/user.changes/header-change';
import {SortChangeDescription} from '../../header/models/user.changes/sort-change-description';


export abstract class AbstractCaseView {

    public headerType: HeaderType = 'case';
    public cases: Array<Case> = [];
    public featuredFields$: BehaviorSubject<Array<string>>;
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
        // TODO initial header layout from configuration/preferences
        this.featuredFields$ = new BehaviorSubject<Array<string>>([]);
    }

    public createNewCase(): void {
        this._sideMenuService.open(NewCaseComponent);
    }

    protected initializeHeader(caseHeaderComponent: HeaderComponent): void {
        caseHeaderComponent.headerService.headerChange$.subscribe((header: HeaderChange) => {
            if (!header) {
                return;
            }
            // TODO: JOZO fix Matove interfaces
            let params: HttpParams = new HttpParams();
            if (header.mode === 'sort') {
                const desc = header.description as SortChangeDescription;
                params = params.set(header.mode, desc.sortMode + desc.identifier);
            }
            // const params = new HttpParams().set(header ? header.type : '',
            //     header.description.sortMode && header.description.identifier ?
            //     header.description.sortMode + header.description.identifier : '');
            // const params = new HttpParams().set('sort', 'asc');
            this._caseResourceService.searchCases({}, params)
                .subscribe((newCases: Array<Case>) => {
                    this.updateCases(newCases);
                });
            // TODO if headers changed their content (different columns should be shown) update featured fields stream
        });
    }

    protected updateCases(newCases: Array<Case>): void {
        // TODO is just replacing the existing cases with new ones a good idea? Is there some data, we might loose?
        this.cases.splice(0, this.cases.length);
        this.featuredFields$.next(['visualId', 'title', 'author', 'creationDate', '']);
        if (!!newCases && Array.isArray(newCases)) {
            this.cases.push(...newCases);
        }
    }

    public abstract handleCaseClick(clickedCase: Case): void;
}
