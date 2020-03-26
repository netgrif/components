import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {CasePanelDefinition, HeaderComponent, HeaderType, NewCaseComponent, SideMenuService} from '@netgrif/application-engine';
import {Observable} from 'rxjs';
import {HeaderChange} from '../../../../netgrif-application-engine/src/lib/header/abstract-header-service';

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

    constructor(private _sideMenuService: SideMenuService) {
    }

    ngAfterViewInit(): void {
        this.caseHeaderComponent.headerService.petriNetReferences.forEach(petriNet => {
            this.casePanelDefinitions.push({
                featuredFields: [
                    petriNet.createdDate.toLocaleString(),
                    petriNet.author.fullName,
                    petriNet.defaultCaseName,
                    petriNet.immediateData[0].title],
                panelIconField: petriNet.title,
                panelIcon: 'add'
            });
        });
        this._changeHeader$ = this.caseHeaderComponent.headerService.headerChange$;
        this._changeHeader$.subscribe((header: HeaderChange) => console.log(header));
    }

    onNewCase() {
        this._sideMenuService.open(NewCaseComponent);
    }

}
