import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractTaskContentComponent,
    FieldConverterService,
    TaskContentService,
    PaperViewService,
    LoggerService,
    NAE_ASYNC_RENDERING_CONFIGURATION,
    TaskEventService
} from '@netgrif/components-core';

@Component({
    selector: 'nc-task-content',
    templateUrl: './task-content.component.html',
    styleUrls: ['./task-content.component.scss']
})
export class TaskContentComponent extends AbstractTaskContentComponent {

    public taskContentComponentClass = TaskContentComponent;

    constructor(protected _fieldConverter: FieldConverterService,
                public taskContentService: TaskContentService,
                protected _paperView: PaperViewService,
                protected _logger: LoggerService,
                @Optional() protected _taskEventService: TaskEventService,
                @Optional() @Inject(NAE_ASYNC_RENDERING_CONFIGURATION) config) {
        super(_fieldConverter, taskContentService, _paperView, _logger, _taskEventService, config);
    }
}
