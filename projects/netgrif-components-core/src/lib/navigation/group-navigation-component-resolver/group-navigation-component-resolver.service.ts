import {Injector, Type} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {NAE_NAVIGATION_ITEM_TASK_DATA} from '../model/filter-case-injection-token';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {LoggerService} from '../../logger/services/logger.service';
import {HttpErrorResponse} from '@angular/common/http';
import {DataField} from '../../data-fields/models/abstract-data-field';
import {FieldConverterService} from '../../task-content/services/field-converter.service';

export abstract class GroupNavigationComponentResolverService {

    protected constructor(
        protected _taskResourceService: TaskResourceService,
        protected _log: LoggerService,
        protected _fieldConverterService: FieldConverterService,
    ) {
    }

    protected abstract resolveViewComponent(navigationItemTaskData: Array<DataField<any>>): Type<any>;

    public createResolvedViewComponentPortal(taskId: string, parentInjector: Injector): Observable<ComponentPortal<any>> {
        const result = new ReplaySubject<ComponentPortal<any>>(1);
        this._taskResourceService.getData(taskId).subscribe(taskData => {
            try {
                const dataFields = this._fieldConverterService.fromLayoutResource(taskData);
                result.next(new ComponentPortal(
                    // TODO release/8.0.0 resolve layout data
                    this.resolveViewComponent(dataFields),
                    null,
                    Injector.create({
                        providers: [
                            {provide: NAE_NAVIGATION_ITEM_TASK_DATA, useValue: dataFields},
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
