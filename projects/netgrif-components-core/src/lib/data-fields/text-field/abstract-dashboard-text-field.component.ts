import {Component, Inject, OnDestroy, OnInit, Optional} from '@angular/core';
import {AbstractTextErrorsComponent} from './abstract-text-errors.component';
import {TextField} from './models/text-field';
import {CustomCard} from '../../dashboard/cards/model/custom-dashboard-model/custom-card';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";
import {ValidationRegistryService} from "../../registry/validation/validation-registry.service";

@Component({
    selector: 'ncc-abstract-dashboard-text-field',
    template: ''
})
export abstract class AbstractDashboardTextFieldComponent extends AbstractTextErrorsComponent<TextField> implements OnInit, OnDestroy {
    public card?: CustomCard;
    public initialized: boolean = false;
    protected _sub: Subscription;

    protected constructor(translate: TranslateService,
                          validationRegistry: ValidationRegistryService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextField>) {
        super(translate, validationRegistry, dataFieldPortalData);
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
}
