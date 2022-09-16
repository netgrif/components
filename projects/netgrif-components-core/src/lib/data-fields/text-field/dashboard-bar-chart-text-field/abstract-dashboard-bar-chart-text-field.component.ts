import {Component} from '@angular/core';
import {CustomCard} from '../../../dashboard/cards/model/custom-dashboard-model/custom-card';
import {TranslateService} from '@ngx-translate/core';
import {DashboardCardTypes} from '../../../dashboard/cards/model/dashboard-card-types';
import {FilterType} from '../../../filter/models/filter-type';
import {AbstractDashboardTextFieldComponent} from '../abstract-dashboard-text-field.component';

@Component({
    selector: 'ncc-abstract-dashboard-bar-chart-text-field',
    template: ''
})
export abstract class AbstractDashboardBarChartTextFieldComponent extends AbstractDashboardTextFieldComponent {

    protected constructor(translate: TranslateService) {
        super(translate);
    }
    
    protected createCard(textFieldValue: string): CustomCard {
        return {
            type: DashboardCardTypes.BAR,
            query: JSON.parse(textFieldValue),
            // TODO parse from config (text field value)
            units: 'TODO units',
            xAxisLabel: 'TODO x axis label',
            yAxisLabel: 'TODO y axis label',
            resourceType: FilterType.CASE,
            layout: {x: 0, y: 0, rows: 1, cols: 1}
        };
    }

}
