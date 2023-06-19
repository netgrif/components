import {Component, Inject, OnDestroy, OnInit, Optional} from '@angular/core';
import {AbstractTextErrorsComponent} from './abstract-text-errors.component';
import {TextField} from './models/text-field';
import {CustomCard} from '../../dashboard/cards/model/custom-dashboard-model/custom-card';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";

@Component({
    selector: 'ncc-abstract-dashboard-text-field',
    template: ''
})
export abstract class AbstractDashboardTextFieldComponent extends AbstractTextErrorsComponent<TextField> implements OnInit, OnDestroy {
    public card?: CustomCard;
    public initialized: boolean = false;
    private _sub: Subscription;

    protected constructor(translate: TranslateService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextField>) {
        super(translate, dataFieldPortalData);
    }

    ngOnInit(): void {
        if (this.formControlRef.value !== undefined) {
            this.card = this.createCard(this.formControlRef.value);
            this.initialized = true;
        }
        this._sub = this.formControlRef.valueChanges.subscribe(newVal => {
            this.card = this.createCard(newVal);
            this.initialized = true;
        });
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }

    protected abstract createCard(textFieldValue: string): CustomCard;

    public getErrorMessage() {
        return this.buildErrorMessage(this.dataField, this.formControlRef);
    }
}
