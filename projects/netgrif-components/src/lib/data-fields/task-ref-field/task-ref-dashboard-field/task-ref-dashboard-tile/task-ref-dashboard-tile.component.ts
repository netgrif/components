import {Component, Injector, Input, OnDestroy, OnInit, Self, SkipSelf, Type} from '@angular/core';
import {AbstractTaskRefDashboardTileComponent, TaskContentService, UnlimitedTaskContentService} from 'netgrif-components-core';
import {Subscription} from 'rxjs';
import {ComponentPortal} from '@angular/cdk/portal';

@Component({
    selector: 'nc-task-ref-dashboard-tile',
    templateUrl: './task-ref-dashboard-tile.component.html',
    styleUrls: ['./task-ref-dashboard-tile.component.scss'],
    providers: [
        {provide: TaskContentService, useClass: UnlimitedTaskContentService}
    ]
})
export class TaskRefDashboardTileComponent extends AbstractTaskRefDashboardTileComponent implements OnInit, OnDestroy {

    portal: ComponentPortal<any>;
    @Input() taskContentComponentClassReference: Type<any>;

    protected _sub: Subscription;

    constructor(protected _injector: Injector,
                @SkipSelf() protected _parentTaskContentService: TaskContentService,
                @Self() protected _myTaskContentService: TaskContentService) {
        super();
    }

    ngOnInit(): void {
        if (this.tile.isEmpty) {
            return;
        }
        this._sub = this._parentTaskContentService.task$.subscribe(t => {
            const fakeTask = Object.assign({}, t);
            fakeTask.dataGroups = this.tile.dataGroups;
            this._myTaskContentService.task = fakeTask;
        });

        this.portal = new ComponentPortal(this.taskContentComponentClassReference, null, this._injector);
    }

    ngOnDestroy(): void {
        if (this._sub !== undefined) {
            this._sub.unsubscribe();
        }
    }

}
