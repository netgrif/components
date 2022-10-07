import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DashboardCardTypes} from '../../../dashboard/cards/model/dashboard-card-types';
import {CustomIframeCard} from '../../../dashboard/cards/model/custom-dashboard-model/custom-iframe-card';
import {AbstractDashboardTextFieldComponent} from '../abstract-dashboard-text-field.component';

@Component({
    selector: 'ncc-abstract-dashboard-iframe-text-field',
    template: ''
})
export abstract class AbstractDashboardIframeTextFieldComponent extends AbstractDashboardTextFieldComponent {

    public card?: CustomIframeCard;

    protected constructor(translate: TranslateService) {
        super(translate);
    }

    protected createCard(textFieldValue: string): CustomIframeCard {
        return {
            url: textFieldValue,
            type: DashboardCardTypes.IFRAME,
            layout: {x: 0, y: 0, rows: 1, cols: 1}
        };
    }
}
