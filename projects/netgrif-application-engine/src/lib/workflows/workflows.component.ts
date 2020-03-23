import {Component, OnInit} from '@angular/core';


@Component({
    selector: 'nae-workflows',
    templateUrl: './workflows.component.html',
    styleUrls: ['./workflows.component.scss']
})
export class WorkflowsComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

    // TODO
    public onImportNet() {
        // this._sideMenuService.open(ImportNetComponent);
    }

}
