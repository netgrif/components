import {Component, Inject, OnInit, Optional} from '@angular/core';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {TaskRefDashboardTile} from './model/task-ref-dashboard-tile';

/**
 * @deprecated
 * */
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
