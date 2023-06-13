import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {LoggerService} from '../../logger/public-api';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {TaskRefDashboardConstants} from './model/task-ref-dashboard-constants';
import {TaskRefField} from './model/task-ref-field';
import {TaskRefDashboardTileConstants} from './model/task-ref-dashboard-tile-constants';
import {TaskRefDashboardTile} from './model/task-ref-dashboard-tile';

@Component({
    selector: 'ncc-abstract-task-ref-field',
    template: ''
})
export abstract class AbstractTaskRefFieldComponent extends AbstractDataFieldComponent implements OnInit {

    dashboardTiles: Array<TaskRefDashboardTile>;

    protected constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
