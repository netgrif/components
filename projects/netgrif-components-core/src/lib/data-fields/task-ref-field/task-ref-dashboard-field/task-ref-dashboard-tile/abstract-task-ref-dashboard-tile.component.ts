import {Component, Input, OnDestroy} from '@angular/core';
import {TaskRefDashboardTile} from '../../model/task-ref-dashboard-tile';
import {CaseResourceService} from '../../../../resources/engine-endpoint/case-resource.service';
import {TaskRefDashboardTileConstants} from '../../model/task-ref-field';
import {Subscription} from 'rxjs';
import {ProcessService} from '../../../../process/process.service';
import {switchMap} from 'rxjs/operators';
import {CreateCaseEventOutcome} from '../../../../event/model/event-outcomes/case-outcomes/create-case-event-outcome';

@Component({
    selector: 'ncc-abstract-task-ref-dashboard-tile',
    template: '',
})
export abstract class AbstractTaskRefDashboardTileComponent implements OnDestroy {

    @Input() tile: TaskRefDashboardTile;

    private _sub: Subscription;

    protected constructor(protected _caseResourceService: CaseResourceService, protected _processService: ProcessService) {
    }

    ngOnDestroy(): void {
        if (this._sub !== undefined) {
            this._sub.unsubscribe();
        }
    }

    createNewDashboardTile() {
        this._sub = this._processService.getNet(TaskRefDashboardTileConstants.DASHBOARD_TILE_PROCESS_IDENTIFIER).pipe(
            switchMap(net => this._caseResourceService.createCase({
                netId: net.stringId,
                title: `tile (${this.tile.x}, ${this.tile.y})`
            }))
        ).subscribe(outcome => {
            if (!outcome.success) {
                // TODO
            }
            const _case = (outcome as CreateCaseEventOutcome).aCase;

        });
    }

}
