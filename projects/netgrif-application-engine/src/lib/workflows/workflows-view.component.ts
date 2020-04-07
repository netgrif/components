import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SideMenuService} from '../side-menu/services/side-menu.service';
import {ImportNetComponent} from '../side-menu/content-components/import-net/import-net.component';
import {WorkflowsViewService} from './services/workflows-view.service';
import {HeaderComponent} from '../header/header.component';
import {Observable} from 'rxjs';
import {HeaderChange} from '../header/models/user.changes/header-change';

@Component({
    selector: 'nae-workflows',
    templateUrl: './workflows-view.component.html',
    styleUrls: ['./workflows-view.component.scss']
})
export class WorkflowsViewComponent implements AfterViewInit {

    @ViewChild('templatePortal') templatePortal: TemplateRef<any>;
    @ViewChild('workflowsHeader') workflowsHeader: HeaderComponent;
    private _changeHeader: Observable<HeaderChange>;

    constructor(private _sideMenuService: SideMenuService, private _workflowsViewService: WorkflowsViewService) {
    }

    ngAfterViewInit(): void {
        this._changeHeader = this.workflowsHeader.headerService.headerChange$;
        this._changeHeader
            .subscribe(headerChange =>
                this.onHeaderChange(headerChange));
    }

    private onHeaderChange(headerChange: HeaderChange): void {
        if (headerChange != null && headerChange.mode === 'edit')
            this._workflowsViewService.setPanelTitles(this.workflowsHeader.headerService.headers);
    }

    public onImportNet() {
        this._sideMenuService.open(ImportNetComponent);
    }

}
