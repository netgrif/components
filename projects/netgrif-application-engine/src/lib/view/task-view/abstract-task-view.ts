import {Observable, Subject} from 'rxjs';
import {OnDestroy} from '@angular/core';
import {TaskPanelData} from '../../panel/task-panel-list/task-panel-data/task-panel-data';
import {ChangedFields} from '../../data-fields/models/changed-fields';
import {TaskViewService} from './service/task-view.service';
import {ViewWithHeaders} from '../abstract/view-with-headers';


export abstract class AbstractTaskView extends ViewWithHeaders implements OnDestroy {

    public tasks$: Observable<Array<TaskPanelData>>;
    public loading$: Observable<boolean>;

    protected constructor(protected taskViewService: TaskViewService) {
        super(taskViewService);
        this.tasks$ = this.taskViewService.tasks$;
        this.loading$ = this.taskViewService.loading$;
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
