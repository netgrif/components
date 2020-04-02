import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    CaseResourceService,
    SideMenuService,
    HeaderComponent,
    AbstractCaseView,
    Case,
} from '@netgrif/application-engine';

@Component({
    selector: 'nae-app-case-view',
    templateUrl: './case-view.component.html',
    styleUrls: ['./case-view.component.scss']
})
export class CaseViewComponent extends AbstractCaseView implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    constructor(_sideMenuService: SideMenuService,
                _caseResourceService: CaseResourceService) {
        super(_sideMenuService, _caseResourceService, '{}');
    }

    ngAfterViewInit(): void {
        this._changeHeader$ = this.caseHeaderComponent.headerService.headerChange$;
        this._changeHeader$.subscribe((header: HeaderChange) => {
            console.log(header);
            let params = new HttpParams();
            // header.type
            // header.description.identifier
            // header.description.sortMode
            // TODO: JOZO fix Matove interfaces
            // const params = new HttpParams().set(header ? header.type : '',
            //     header.description.sortMode &&
            //     header.description.identifier ? header.description.sortMode + header.description.identifier : '');
            if (header !== null && header.type === 'sort') {
                params = new HttpParams().set('sort', header.description['identifier'] + ',' + header.description['sortMode']);
            }
            this._caseResourceService.searchCases({}, params)
                .subscribe((cazes: Array<Case>) => {
                    this.setCasePanelFromResource(cazes);
                });
        });
    }

    public setCasePanelFromResource(cazes: Array<Case>) {
        if (cazes.length > 0) {
            cazes.forEach(caze => {
                const caseDefinition = {
                    featuredFields: [
                        new Date(caze.creationDate[6]).toLocaleString(),
                        caze.author.fullName,
                        caze.visualId,
                        ' '
                    ],
                    panelIconField: caze.title,
                    panelIcon: 'home',
                    caseId: caze.stringId
                };
                if (!this.casePanelDefinitions.some(caseDef => caseDef.caseId === caseDefinition.caseId)) {
                    this.casePanelDefinitions.push(caseDefinition);
                }
            });
        }
    }

    public handleCaseClick(clickedCase: Case): void {
        console.log(clickedCase.stringId);
    }

}
