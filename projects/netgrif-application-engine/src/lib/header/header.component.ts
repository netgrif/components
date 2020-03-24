import {Component, Injector, Input, OnInit} from '@angular/core';
import {AbstractHeaderService, HeaderType} from './abstract-header-service';
import {CaseHeaderService} from './case-header/case-header.service';
import {TaskHeaderService} from './task-header/task-header.service';


@Component({
    selector: 'nae-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [CaseHeaderService, TaskHeaderService]
})
export class HeaderComponent implements OnInit {

    @Input()
    type: HeaderType = 'case';
    @Input()
    hideEditMode = false;
    public headerService: AbstractHeaderService;

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
                // TODO
                break;
        }
    }

}
