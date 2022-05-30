import {Observable} from 'rxjs';
import {Component, OnDestroy} from '@angular/core';
import {TaskPanelData} from '../../panel/task-panel-list/task-panel-data/task-panel-data';
import {TaskViewService} from './service/task-view.service';
import {AbstractViewWithHeadersComponent} from '../abstract/view-with-headers';

@Component({
    selector: 'ncc-abstract-task-view',
    template: ''
})
export abstract class AbstractTaskViewComponent extends AbstractViewWithHeadersComponent implements OnDestroy {

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
