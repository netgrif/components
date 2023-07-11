import {Injector, Type} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {NAE_NAVIGATION_ITEM_TASK_DATA} from '../model/filter-case-injection-token';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {LoggerService} from '../../logger/services/logger.service';
import {DataGroup} from '../../resources/interface/data-groups';
import {HttpErrorResponse} from '@angular/common/http';

export abstract class GroupNavigationComponentResolverService {

    protected constructor(protected _taskResourceService: TaskResourceService,
                          protected _log: LoggerService) {
    }

    protected abstract resolveViewComponent(navigationItemTaskData: Array<DataGroup>): Type<any>;

    public createResolvedViewComponentPortal(taskId: string, parentInjector: Injector): Observable<ComponentPortal<any>> {
        const result = new ReplaySubject<ComponentPortal<any>>(1);
        this._taskResourceService.getData(taskId).subscribe(taskData => {
            try {
                result.next(new ComponentPortal(
                    this.resolveViewComponent(taskData),
                    null,
                    Injector.create({
                        providers: [
                            {provide: NAE_NAVIGATION_ITEM_TASK_DATA, useValue: taskData},
                        ],
                        parent: parentInjector
                    })
                ));
                result.complete();
            } catch (e) {
                this.forwardError(result, e);
            }
        }, e => {
            this.forwardError(result, e);
        });

        return result.asObservable();
    }

    private forwardError(result: Subject<any>, error: Error): void {
        result.error(error instanceof HttpErrorResponse ? error.error.message : error.message);
        result.complete();
    }
}
