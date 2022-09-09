import {Component, Input} from '@angular/core';
import {TaskRefDashboardTile} from '../../model/task-ref-dashboard-tile';

@Component({
    selector: 'ncc-abstract-task-ref-dashboard-tile',
    template: '',
})
export abstract class AbstractTaskRefDashboardTileComponent {

    @Input() tile: TaskRefDashboardTile;

    protected constructor() {
    }

}
