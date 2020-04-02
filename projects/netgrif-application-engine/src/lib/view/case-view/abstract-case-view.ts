import {NewCaseComponent} from '../../side-menu/new-case/new-case.component';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {Case} from '../../resources/interface/case';
import {Observable, ReplaySubject} from 'rxjs';
import {HeaderComponent} from '../../header/header.component';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {HeaderChange} from '../../header/models/user-changes/header-change';
import {HeaderType} from '../../header/models/header-type';
import {SelectedHeaderField} from '../../header/models/selected-header-field';


export abstract class AbstractCaseView {

    public readonly headerType: HeaderType = HeaderType.CASE;
    public cases: Array<Case> = [];
    public featuredFields$: ReplaySubject<Array<SelectedHeaderField>>;
    private _changeHeader$: Observable<HeaderChange>;

    protected constructor(protected _sideMenuService: SideMenuService,
                          protected _caseResourceService: CaseResourceService,
                          protected _baseFilter: string = '{}') {
        this._caseResourceService.getAllCase()
            .subscribe((newCases: Array<Case>) => {
                this.updateCases(newCases);
            });
        this.featuredFields$ = new ReplaySubject<Array<SelectedHeaderField>>(1);
    }

    public createNewCase(): void {
        this._sideMenuService.open(NewCaseComponent);
    }

    protected initializeHeader(caseHeaderComponent: HeaderComponent): void {
        caseHeaderComponent.headerService.selectedFields$.subscribe( featuredFields => this.featuredFields$.next(featuredFields));
        // TODO sort cases on header change
        // this._changeHeader$ = caseHeaderComponent.headerService.headerChange$;
        // this._changeHeader$.subscribe((header: HeaderChange) => {
        //     const params = new HttpParams().set('sort', 'asc');
        //     this._caseResourceService.searchCases({}, params)
        //         .subscribe((newCases: Array<Case>) => {
        //             this.updateCases(newCases);
        //         });
        // });
    }

    protected updateCases(newCases: Array<Case>): void {
        // TODO is just replacing the existing cases with new ones a good idea? Is there some data, we might loose?
        this.cases.splice(0, this.cases.length);
        this.cases.push(...newCases);
    }

    public abstract handleCaseClick(clickedCase: Case): void;
}
