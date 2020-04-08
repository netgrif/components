import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {SideMenuService} from '../side-menu/services/side-menu.service';
import {ImportNetComponent} from '../side-menu/import-net/import-net.component';
import {WorkflowsViewService} from './services/workflows-view.service';
import {HeaderComponent} from '../header/header.component';
import {ViewWithHeaders} from '../view/abstract/view-with-headers';


@Component({
    selector: 'nae-workflows',
    templateUrl: './workflow-view.component.html',
    styleUrls: ['./workflow-view.component.scss']
})
export class WorkflowViewComponent extends ViewWithHeaders implements AfterViewInit {

    @ViewChild('header') public workflowHeader: HeaderComponent;

    constructor(private _sideMenuService: SideMenuService, private _workflowViewService: WorkflowsViewService) {
        super(_workflowViewService);
    }

    ngAfterViewInit(): void {
        this._changeHeader = this.workflowHeader.headerService.headerChange$;
        this._changeHeader
            .subscribe(headerChange =>
                this.onHeaderChange(headerChange));
    }

    public importNet() {
        this._sideMenuService.open(ImportNetComponent);
    }

}
