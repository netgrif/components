import {Component, Inject, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DashboardCardTypes} from '../../../dashboard/cards/model/dashboard-card-types';
import {CustomIframeCard} from '../../../dashboard/cards/model/custom-dashboard-model/custom-iframe-card';
import {AbstractDashboardTextFieldComponent} from '../abstract-dashboard-text-field.component';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {TextField} from "../models/text-field";
import {NAE_SAVE_DATA_INFORM} from "../../models/save-data-inform-token";

@Component({
    selector: 'ncc-abstract-dashboard-iframe-text-field',
    template: ''
})
export abstract class AbstractDashboardIframeTextFieldComponent extends AbstractDashboardTextFieldComponent {

    public card?: CustomIframeCard;

    protected constructor(translate: TranslateService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextField>,
                          @Optional() @Inject(NAE_SAVE_DATA_INFORM) _saveDataInform: boolean) {
        super(translate, dataFieldPortalData, _saveDataInform);
    }

    protected createCard(textFieldValue: string): CustomIframeCard {
        return {
            url: textFieldValue,
            type: DashboardCardTypes.IFRAME,
            layout: {x: 0, y: 0, rows: 1, cols: 1}
        };
    }
}
