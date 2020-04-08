import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {ImportNetComponent} from '../../side-menu/import-net/import-net.component';
import {WorkflowViewService} from './workflow-view.service';
import {HeaderComponent} from '../../header/header.component';
import {ViewWithHeaders} from '../abstract/view-with-headers';
import {HeaderType} from '../../header/models/header-type';
import {PetriNetReference} from '../../resources/interface/petri-net-reference';
import {Observable} from 'rxjs';


@Component({
    selector: 'nae-workflow-view',
    templateUrl: './workflow-view.component.html',
    styleUrls: ['./workflow-view.component.scss'],
})
export class WorkflowViewComponent extends ViewWithHeaders implements AfterViewInit {

    public readonly headerType = HeaderType.WORKFLOW;
    @ViewChild('header') public workflowHeader: HeaderComponent;

    constructor(private _sideMenuService: SideMenuService, private _workflowViewService: WorkflowViewService) {
        super(_workflowViewService);
        this._workflowViewService.reload();
    }

    public get workflows$(): Observable<Array<PetriNetReference>> {
        return this._workflowViewService.workflows$;
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.workflowHeader);
    }

    public importNet() {
        this._sideMenuService.open(ImportNetComponent);
    }

}
