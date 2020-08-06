import {Component, Injector, Input, OnInit} from '@angular/core';
import {AbstractHeaderService} from './abstract-header-service';
import {CaseHeaderService} from './case-header/case-header.service';
import {TaskHeaderService} from './task-header/task-header.service';
import {WorkflowHeaderService} from './workflow-header/workflow-header.service';
import {HeaderType} from './models/header-type';
import {HeaderMode} from './models/header-mode';


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

    private _initHeaderCount: number = undefined;
    private _initResponsiveHeaders: boolean = undefined;

    constructor(private _injector: Injector) {
    }

    @Input()
    public set maxHeaderColumns(count: number) {
        if (this.headerService) {
            this.headerService.headerColumnCount = count;
        } else {
            this._initHeaderCount = count;
        }
    }

    @Input()
    public set responsiveHeaders(responsive: boolean) {
        if (this.headerService) {
            this.headerService.responsiveHeaders = responsive;
        } else {
            this._initResponsiveHeaders = responsive;
        }
    }

    ngOnInit(): void {
        this.resolveHeaderService();
        if (this._initHeaderCount !== undefined) {
            this.headerService.headerColumnCount = this._initHeaderCount;
        }
        if (this._initResponsiveHeaders !== undefined) {
            this.headerService.responsiveHeaders = this._initResponsiveHeaders;
        }
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
