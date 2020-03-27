import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {CasePanelDefinition, HeaderComponent, NewCaseComponent, SideMenuService} from '@netgrif/application-engine';
import {Observable} from 'rxjs';
import {HeaderType} from '../../../../netgrif-application-engine/src/lib/header/abstract-header-service';
import {HeaderChange} from '../../../../netgrif-application-engine/src/lib/header/models/user.changes/header-change';
import {CaseJsonResourceService} from '../case-json-resource.service';
import {Case} from '../../../../netgrif-application-engine/src/lib/resources/interface/case';
import {HttpParams} from '@angular/common/http';
import {TaskJsonResourceService} from '../../../../../task-json-resource.service';

@Component({
    selector: 'nae-app-case-view',
    templateUrl: './case-view.component.html',
    styleUrls: ['./case-view.component.scss']
})
export class CaseViewComponent implements AfterViewInit {

    public headerType: HeaderType = 'case';
    public casePanelDefinitions: Array<CasePanelDefinition> = [];
    private _changeHeader$: Observable<HeaderChange>;
    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    constructor(private _sideMenuService: SideMenuService,
                private _caseResourceService: CaseJsonResourceService,
                private _taskResourceService: TaskJsonResourceService) {
        this._caseResourceService.getAllCase()
            .subscribe((cazes: Array<Case>) => {
                this.setCasePanelFromResource(cazes);
            });
    }

    ngAfterViewInit(): void {
        this._changeHeader$ = this.caseHeaderComponent.headerService.headerChange$;
        this._changeHeader$.subscribe((header: HeaderChange) => {
            console.log(header);
            // TODO: JOZO fix Matove interfaces
            // const params = new HttpParams().set(header ? header.type : '',
            //     header.description.sortMode && header.description.identifier ? header.description.sortMode + header.description.identifier : '');
            const params = new HttpParams().set('sort', 'asc');
            this._caseResourceService.searchCases({}, params)
                .subscribe((cazes: Array<Case>) => {
                    this.setCasePanelFromResource(cazes);
                });
        });
    }

    public setCasePanelFromResource(cazes: Array<Case>) {
        cazes.forEach(caze => {
            const caseDefinition = {
                featuredFields: [
                    new Date(caze.creationDate[6]).toLocaleString(),
                    caze.author.fullName,
                    caze.visualId,
                    ' '
                ],
                panelIconField: caze.title,
                panelIcon: 'add',
                caseId: caze.stringId
            };
            if (!this.casePanelDefinitions.some(caseDef => caseDef.caseId === caseDefinition.caseId)) {
                this.casePanelDefinitions.push(caseDefinition);
            }
        });
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
        this._sideMenuService.open(NewCaseComponent);
    }

}
