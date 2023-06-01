import {Component} from '@angular/core';
import {CustomCard} from '../../../dashboard/cards/model/custom-dashboard-model/custom-card';
import {TranslateService} from '@ngx-translate/core';
import {DashboardCardTypes} from '../../../dashboard/cards/model/dashboard-card-types';
import {FilterType} from '../../../filter/models/filter-type';
import {AbstractDashboardTextFieldComponent} from '../abstract-dashboard-text-field.component';
import {ValidationRegistryService} from "../../../validation/service/validation-registry.service";

@Component({
    selector: 'ncc-abstract-dashboard-bar-chart-text-field',
    template: ''
})
export abstract class AbstractDashboardBarChartTextFieldComponent extends AbstractDashboardTextFieldComponent {

    protected constructor(translate: TranslateService, _validationRegistry: ValidationRegistryService) {
        super(translate, _validationRegistry);
    }

    protected createCard(textFieldValue: string): CustomCard {
        const parsedValue = JSON.parse(textFieldValue) as CustomCard;
        return {
            type: DashboardCardTypes.BAR,
            query: parsedValue.query,
            title: parsedValue.title,
            xAxisLabel: parsedValue.xAxisLabel,
            yAxisLabel: parsedValue.yAxisLabel,
            resourceType: !!parsedValue.resourceType ? parsedValue.resourceType : FilterType.CASE,
            layout: {x: 0, y: 0, rows: 1, cols: 1}
        };
    }

}
