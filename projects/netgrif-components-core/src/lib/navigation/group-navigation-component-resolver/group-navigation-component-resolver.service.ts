import {Injector, Type} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {NAE_NAVIGATION_ITEM_TASK_DATA} from '../model/filter-case-injection-token';
import {LoggerService} from '../../logger/services/logger.service';
import {DataGroup} from '../../resources/interface/data-groups';
import {HttpErrorResponse} from '@angular/common/http';
import {TaskResourceService} from "../../resources/engine-endpoint/task-resource.service";
import {CaseResourceService} from "../../resources/engine-endpoint/case-resource.service";
import {decodeBase64} from "../../utility/base64";
import {DoubleDrawerUtils} from "../navigation-double-drawer/util/double-drawer-utils";
import {GroupNavigationConstants} from "../model/group-navigation-constants";

export abstract class GroupNavigationComponentResolverService {

    protected constructor(
        protected _taskResourceService: TaskResourceService,
        protected _caseResourceService: CaseResourceService,
        protected _log: LoggerService) {
    }

    protected abstract resolveViewComponent(navigationItemTaskData: Array<DataGroup>): Type<any>;

    public createResolvedViewComponentPortal(encodedCaseId: string, parentInjector: Injector): Observable<ComponentPortal<any>> {
        const result = new ReplaySubject<ComponentPortal<any>>(1);
        const decodedCaseId = decodeBase64(encodedCaseId);
        this._caseResourceService.getOneCase(decodedCaseId)
            .pipe(switchMap((useCase) => {
                const taskId = DoubleDrawerUtils.findTaskIdInCase(useCase, GroupNavigationConstants.ITEM_TRANS_ID_ALL_DATA);
                if (taskId === undefined) {
                    return;
                }
                return this._taskResourceService.getData(taskId)
            })).subscribe(itemData => {
            try {
                result.next(new ComponentPortal(
                    this.resolveViewComponent(itemData),
                    null,
                    Injector.create({
                        providers: [
                            {provide: NAE_NAVIGATION_ITEM_TASK_DATA, useValue: itemData},
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
