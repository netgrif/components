import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractSingleTaskComponent,
    InjectedTabData,
    LoggerService,
    NAE_TAB_DATA,
    NAE_TASK_CONTENT_SERVICE_TYPE, TaskContentServiceType
} from '@netgrif/components-core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'nc-single-task',
    templateUrl: './single-task.component.html',
    styleUrls: ['./single-task.component.scss'],
    providers: [{provide: NAE_TASK_CONTENT_SERVICE_TYPE, useValue: TaskContentServiceType.UNLIMITED}]
})
export class SingleTaskComponent extends AbstractSingleTaskComponent {

    constructor(protected _log: LoggerService,
                protected _route: ActivatedRoute,
                @Optional() @Inject(NAE_TAB_DATA) _injectedTabData: InjectedTabData) {
        super(_log, _route, _injectedTabData);
    }

}
