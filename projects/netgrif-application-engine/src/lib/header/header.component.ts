import {Component, Injector, Input, OnInit} from '@angular/core';
import {AbstractHeaderService} from './abstract-header-service';
import {CaseHeaderService} from './case-header/case-header.service';
import {TaskHeaderService} from './task-header/task-header.service';
import {WorkflowHeaderService} from './workflow-header/workflow-header.service';
import {HeaderType} from './models/header-type';
import {HeaderMode} from './models/header-mode';
import {Observable} from 'rxjs';
import {Net} from '../process/net';


@Component({
    selector: 'nae-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [CaseHeaderService, TaskHeaderService, WorkflowHeaderService]
})
export class HeaderComponent implements OnInit {

    @Input() type: HeaderType = HeaderType.CASE;
    @Input() hideEditMode = false;
    public headerService: AbstractHeaderService;
    public readonly headerModeEnum = HeaderMode;

    constructor(private _injector: Injector) {
    }

    ngOnInit(): void {
        this.resolveHeaderService();
    }

    private resolveHeaderService() {
        switch (this.type) {
            case 'case':
                this.headerService = this._injector.get(CaseHeaderService);
                break;
            case 'task':
                this.headerService = this._injector.get(TaskHeaderService);
                break;
            case 'workflow':
                this.headerService = this._injector.get(WorkflowHeaderService);
                break;
        }
    }

}
