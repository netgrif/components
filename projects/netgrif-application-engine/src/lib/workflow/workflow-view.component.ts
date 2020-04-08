import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {SideMenuService} from '../side-menu/services/side-menu.service';
import {ImportNetComponent} from '../side-menu/import-net/import-net.component';
import {WorkflowViewService} from './services/workflow-view.service';
import {HeaderComponent} from '../header/header.component';
import {ViewWithHeaders} from '../view/abstract/view-with-headers';
import {WorkflowPanelGroupService} from './workflow-panel-group/services/workflow-panel-group.service';


@Component({
    selector: 'nae-workflow-view',
    templateUrl: './workflow-view.component.html',
    styleUrls: ['./workflow-view.component.scss'],
    providers: [WorkflowPanelGroupService]
})
export class WorkflowViewComponent extends ViewWithHeaders implements AfterViewInit {

    @ViewChild('header') public workflowHeader: HeaderComponent;

    constructor(private _sideMenuService: SideMenuService, private _workflowViewService: WorkflowViewService) {
        super(_workflowViewService);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.workflowHeader);
    }

    public importNet() {
        this._sideMenuService.open(ImportNetComponent);
    }

}
