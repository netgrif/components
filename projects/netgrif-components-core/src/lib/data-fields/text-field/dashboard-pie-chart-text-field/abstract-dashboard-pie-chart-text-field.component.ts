import {Component, Inject, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CustomCard} from '../../../dashboard/cards/model/custom-dashboard-model/custom-card';
import {DashboardCardTypes} from '../../../dashboard/cards/model/dashboard-card-types';
import {FilterType} from '../../../filter/models/filter-type';
import {AbstractDashboardTextFieldComponent} from '../abstract-dashboard-text-field.component';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {TextField} from "../models/text-field";
import {NAE_SAVE_DATA_INFORM} from "../../models/save-data-inform-token";

@Component({
    selector: 'ncc-abstract-dashboard-pie-chart-text-field',
    template: ''
})
export abstract class AbstractDashboardPieChartTextFieldComponent extends AbstractDashboardTextFieldComponent {

    protected constructor(translate: TranslateService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextField>,
                          @Optional() @Inject(NAE_SAVE_DATA_INFORM) _saveDataInform: boolean | null = false) {
        super(translate, dataFieldPortalData, _saveDataInform);
    }

    protected createCard(textFieldValue: string): CustomCard {
        const parsedValue = JSON.parse(textFieldValue) as CustomCard;
        return {
            type: DashboardCardTypes.PIE,
            query: parsedValue.query,
            title: parsedValue.title,
            resourceType: !!parsedValue.resourceType ? parsedValue.resourceType : FilterType.CASE,
            layout: {x: 0, y: 0, rows: 1, cols: 1}
        };
    }
}
