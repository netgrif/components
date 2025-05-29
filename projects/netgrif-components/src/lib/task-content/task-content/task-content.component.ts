import {Component, Optional} from '@angular/core';
import {
    AbstractTaskContentComponent,
    FieldConverterService,
    LoggerService,
    TaskContentService,
    TaskEventService
} from '@netgrif/components-core';

@Component({
    selector: 'nc-task-content',
    templateUrl: './task-content.component.html',
    styleUrls: ['./task-content.component.scss'],
    standalone: false
})
export class TaskContentComponent extends AbstractTaskContentComponent {

    public taskContentComponentClass = TaskContentComponent;

    constructor(protected _fieldConverter: FieldConverterService,
                public taskContentService: TaskContentService,
                protected _logger: LoggerService,
                @Optional() protected _taskEventService: TaskEventService) {
        super(_fieldConverter, taskContentService, _logger, _taskEventService);
    }
}
