import {NewCaseComponent} from '../../side-menu/new-case/new-case.component';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {Case} from '../../resources/interface/case';
import {BehaviorSubject, Observable} from 'rxjs';
import {HeaderComponent} from '../../header/header.component';
import {HttpParams} from '@angular/common/http';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {HeaderChange} from '../../header/models/user-changes/header-change';
import {HeaderType} from '../../header/models/header-type';


export abstract class AbstractCaseView {

    public headerType: HeaderType = HeaderType.CASE;
    public cases: Array<Case> = [];
    public featuredFields$: BehaviorSubject<Array<string>>;
    private _changeHeader$: Observable<HeaderChange>;

    protected constructor(protected _sideMenuService: SideMenuService,
                          protected _caseResourceService: CaseResourceService,
                          protected _baseFilter: string = '{}') {
        this._caseResourceService.getAllCase()
            .subscribe((newCases: Array<Case>) => {
                this.updateCases(newCases);
            });
        // TODO initial header layout from configuration/preferences
        this.featuredFields$ = new BehaviorSubject<Array<string>>([]);
    }

    public createNewCase(): void {
        this._sideMenuService.open(NewCaseComponent);
    }

    protected initializeHeader(caseHeaderComponent: HeaderComponent): void {
        this._changeHeader$ = caseHeaderComponent.headerService.headerChange$;
        this._changeHeader$.subscribe((header: HeaderChange) => {
            console.log(header);
// TODO: JOZO fix Matove interfaces
// const params = new HttpParams().set(header ? header.type : '',
//     header.description.sortMode && header.description.identifier ? header.description.sortMode + header.description.identifier : '');
            const params = new HttpParams().set('sort', 'asc');
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
        this.cases.push(...newCases);
    }

    public abstract handleCaseClick(clickedCase: Case): void;
}
