import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractTextErrorsComponent} from './abstract-text-errors.component';
import {TextField} from './models/text-field';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../data-field-template/models/wrapped-boolean';
import {CustomCard} from '../../dashboard/cards/model/custom-dashboard-model/custom-card';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'ncc-abstract-dashboard-text-field',
    template: ''
})
export abstract class AbstractDashboardTextFieldComponent extends AbstractTextErrorsComponent implements OnInit, OnDestroy {
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
        return this.buildErrorMessage(this.textField, this.formControlRef);
    }
}
