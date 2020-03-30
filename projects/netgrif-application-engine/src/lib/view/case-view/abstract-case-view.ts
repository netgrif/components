import {NewCaseComponent} from '../../side-menu/new-case/new-case.component';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {Case} from '../../resources/interface/case';
import {CasePanelDefinition, HeaderChange, HeaderType} from 'netgrif-application-engine';
import {Observable} from 'rxjs';
import {HeaderComponent} from '../../header/header.component';
import {HttpParams} from '@angular/common/http';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';


export abstract class AbstractCaseView {

    public headerType: HeaderType = 'case';
    public casePanelDefinitions: Array<CasePanelDefinition> = [];
    private _changeHeader$: Observable<HeaderChange>;

    protected constructor(private _sideMenuService: SideMenuService,
                          private _caseResourceService: CaseResourceService,
                          private baseFilter: string = '{}') {
        this._caseResourceService.getAllCase()
            .subscribe((cases: Array<Case>) => {
                this.setCasePanelFromResource(cases);
            });
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
                .subscribe((cases: Array<Case>) => {
                    this.setCasePanelFromResource(cases);
                });
        });
    }

    protected setCasePanelFromResource(cases: Array<Case>): void {
        cases.forEach(case_ => {
            if (!this.casePanelDefinitions.some(caseDef => caseDef.caseId === case_.stringId)) {
                const caseDefinition = {
                    featuredFields: [
                        new Date(case_.creationDate[6]).toLocaleString(),
                        case_.author.fullName,
                        case_.visualId,
                        ' '
                    ],
                    panelIconField: case_.title,
                    panelIcon: 'add',
                    caseId: case_.stringId
                };
                this.casePanelDefinitions.push(caseDefinition);
            }
        });
    }

    protected abstract handleCaseClick(): void;
}
