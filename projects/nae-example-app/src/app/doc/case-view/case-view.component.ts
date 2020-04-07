import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    Case,
    CasePanelDefinition,
    CaseResourceService,
    HeaderChange,
    HeaderComponent,
    NewCaseComponent,
    SideMenuService,
    SideMenuWidth,
    TaskResourceService,
} from 'netgrif-application-engine';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {HeaderType} from '@netgrif/application-engine/lib/header/abstract-header-service';

@Component({
    selector: 'nae-app-case-view',
    templateUrl: './case-view.component.html',
    styleUrls: ['./case-view.component.scss']
})
export class CaseViewComponent implements AfterViewInit {

    authorityToCreate: Array<string> = ['ROLE_USER', 'ROLE_ADMIN'];
    public headerType: HeaderType = 'case';
    public casePanelDefinitions: Array<CasePanelDefinition> = [];
    private _changeHeader$: Observable<HeaderChange>;
    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    constructor(private _sideMenuService: SideMenuService,
                // private _user: User,
                private _caseResourceService: CaseResourceService,
                private _taskResourceService: TaskResourceService) {
        this._caseResourceService.getAllCase()
            .subscribe((cazes: Array<Case>) => {
                this.setCasePanelFromResource(cazes);
            });
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

    public redirectToTasksOfCase(caseDefinition: CasePanelDefinition): void {
        this._taskResourceService.searchTask({case: caseDefinition.caseId})
            .subscribe(tasks => {
                tasks.forEach(task => {
                    console.log(task);
                });
            });
    }

    public onCreateNewCase(): void {
        this._sideMenuService.open(NewCaseComponent, SideMenuWidth.MEDIUM, ['BB']);
    }
    // USER?
    // public hasAutority(): boolean {
    //     if (!this.authorityToCreate || !this._user || !this._user.authorities) return false;
    //     if (this.authorityToCreate instanceof Array) {
    //         return this.authorityToCreate.some(a => this._user.authorities.some(u => u === a));
    //     }
    // }

}
