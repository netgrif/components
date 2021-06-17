import {Injector, Type} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {Observable, ReplaySubject} from 'rxjs';
import {NAE_NAVIGATION_ITEM_TASK_DATA} from '../model/filter-case-injection-token';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {LoggerService} from '../../logger/services/logger.service';
import {DataGroup} from '../../resources/interface/data-groups';

export abstract class GroupNavigationComponentResolverService {

    protected constructor(protected _taskResourceService: TaskResourceService,
                          protected _parentInjector: Injector,
                          protected _log: LoggerService) {
    }

    protected abstract resolveViewComponent(navigationItemTaskData: Array<DataGroup>): Type<any>;

    public createResolvedViewComponentPortal(taskId: string): Observable<ComponentPortal<any>> {
        const result = new ReplaySubject<ComponentPortal<any>>(1);
        this._taskResourceService.getData(taskId).subscribe(taskData => {
            result.next(new ComponentPortal(
                this.resolveViewComponent(taskData),
                null,
                Injector.create({providers: [{provide: NAE_NAVIGATION_ITEM_TASK_DATA, useValue: taskData}], parent: this._parentInjector})
            ));
            result.complete();
        }, e => {
            result.error(e);
            result.complete();
        });

        return result.asObservable();
    }
}
