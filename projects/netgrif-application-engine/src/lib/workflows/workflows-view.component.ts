import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SideMenuService} from '../side-menu/services/side-menu.service';
import {ImportNetComponent} from '../side-menu/import-net/import-net.component';


@Component({
    selector: 'nae-workflows',
    templateUrl: './workflows-view.component.html',
    styleUrls: ['./workflows-view.component.scss']
})
export class WorkflowsViewComponent implements OnInit {

    @ViewChild('templatePortal') templatePortal: TemplateRef<any>;

    constructor(private _sideMenuService: SideMenuService) {
    }

    ngOnInit(): void {
    }

    public onImportNet() {
        this._sideMenuService.open(ImportNetComponent);
    }

}
