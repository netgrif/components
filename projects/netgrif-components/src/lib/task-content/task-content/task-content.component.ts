import {Component} from '@angular/core';
import {
    AbstractTaskContentComponent,
    FieldConverterService,
    TaskContentService,
    PaperViewService,
    LoggerService
} from '@netgrif/application-engine';

@Component({
    selector: 'nc-task-content',
    templateUrl: './task-content.component.html',
    styleUrls: ['./task-content.component.scss']
})
export class TaskContentComponent extends AbstractTaskContentComponent {

    constructor(protected _fieldConverter: FieldConverterService,
                public taskContentService: TaskContentService,
                protected _paperView: PaperViewService,
                protected _logger: LoggerService) {
        super(_fieldConverter, taskContentService, _paperView, _logger);
    }
}
