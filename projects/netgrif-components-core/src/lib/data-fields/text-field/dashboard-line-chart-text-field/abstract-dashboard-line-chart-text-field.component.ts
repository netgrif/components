import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractTextErrorsComponent} from '../abstract-text-errors.component';
import {TextField} from '../models/text-field';
import {FormControl} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {CustomCard} from '../../../dashboard/cards/model/custom-dashboard-model/custom-card';
import {DashboardCardTypes} from '../../../dashboard/cards/model/dashboard-card-types';
import {FilterType} from '../../../filter/models/filter-type';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';

@Component({
    selector: 'ncc-abstract-dashboard-line-chart-text-field',
    template: ''
})
export abstract class AbstractDashboardLineChartTextFieldComponent extends AbstractTextErrorsComponent implements OnInit, OnDestroy {

    @Input() textField: TextField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    public card?: CustomCard;
    public initialized: boolean = false;
    private _sub: Subscription;

    protected constructor(translate: TranslateService) {
        super(translate);
    }

    ngOnInit(): void {
        if (this.formControlRef.value !== undefined) {
            this.card = this.createCard(this.formControlRef.value);
            this.initialized = true;
        }
        this._sub = this.formControlRef.valueChanges.subscribe(json => {
            this.card = this.createCard(json);
            this.initialized = true;
        });
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }

    protected createCard(textFieldValue: string): CustomCard {
        return {
            type: DashboardCardTypes.LINE,
            query: JSON.parse(textFieldValue),
            // TODO parse from config (text field value)
            units: 'TODO units',
            xAxisLabel: 'TODO x axis label',
            yAxisLabel: 'TODO y axis label',
            resourceType: FilterType.CASE,
            layout: {x: 0, y: 0, rows: 1, cols: 1}
        };
    }

    public getErrorMessage() {
        return this.buildErrorMessage(this.textField, this.formControlRef);
    }
}
