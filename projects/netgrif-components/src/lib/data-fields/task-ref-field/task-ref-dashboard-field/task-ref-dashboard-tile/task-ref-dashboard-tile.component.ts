import {Component, Inject, Injector, Input, OnDestroy, OnInit, Self, SkipSelf, Type} from '@angular/core';
import {
    AbstractTaskRefDashboardTileComponent,
    CallChainService,
    CaseResourceService,
    LoggerService,
    NAE_TASK_OPERATIONS,
    ProcessService,
    TaskContentService, TaskDataService,
    TaskOperations,
    TaskResourceService,
    UnlimitedTaskContentService,
    FrontActionService
} from '@netgrif/components-core';
import {Subscription} from 'rxjs';
import {ComponentPortal} from '@angular/cdk/portal';

@Component({
    selector: 'nc-task-ref-dashboard-tile',
    templateUrl: './task-ref-dashboard-tile.component.html',
    styleUrls: ['./task-ref-dashboard-tile.component.scss'],
    providers: [
        FrontActionService,
        {provide: TaskContentService, useClass: UnlimitedTaskContentService}
    ]
})
export class TaskRefDashboardTileComponent extends AbstractTaskRefDashboardTileComponent implements OnInit, OnDestroy {

    portal: ComponentPortal<any>;
    @Input() taskContentComponentClassReference: Type<any>;

    private _subTask: Subscription;

    constructor(caseResourceService: CaseResourceService,
                processService: ProcessService,
                logger: LoggerService,
                taskResourceService: TaskResourceService,
                callChainService: CallChainService,
                taskDataService: TaskDataService,
                @SkipSelf() parentTaskContentService: TaskContentService,
                @Inject(NAE_TASK_OPERATIONS) taskOperations: TaskOperations,
                protected _injector: Injector,
                @Self() protected _myTaskContentService: TaskContentService) {
        super(caseResourceService, processService, logger, taskResourceService, callChainService, parentTaskContentService, taskDataService, taskOperations);
    }

    ngOnInit(): void {
        // TODO JOFO: fix on new layouts
        // if (this.tile.isEmpty) {
        //     return;
        // }
        // this._subTask = this._parentTaskContentService.task$.subscribe(t => {
        //     const fakeTask = Object.assign({}, t);
        //     fakeTask.dataGroups = this.tile.dataGroups;
        //     this._myTaskContentService.task = fakeTask;
        //     this._myTaskContentService.$shouldCreate.next(fakeTask.dataGroups);
        // });
        //
        // this.portal = new ComponentPortal(this.taskContentComponentClassReference, null, this._injector);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        if (this._subTask !== undefined) {
            this._subTask.unsubscribe();
        }
    }

}
