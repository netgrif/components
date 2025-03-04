import {Component, Inject, OnDestroy, OnInit, Optional} from '@angular/core';
import {
    AbstractButtonDefaultFieldComponent, ButtonField,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    DialogService, ValidationRegistryService
} from '@netgrif/components-core';
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from 'rxjs';

@Component({
    selector: 'nc-button-default-field',
    templateUrl: './button-default-field.component.html',
    styleUrls: ['./button-default-field.component.scss']
})
export class ButtonDefaultFieldComponent extends AbstractButtonDefaultFieldComponent implements OnInit, OnDestroy {

    public align: string;
    public stretch: boolean;
    protected subComp: Subscription;

    constructor(_translate: TranslateService,
                _validationRegistry: ValidationRegistryService,
                _dialogService: DialogService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<ButtonField>) {
        super(_translate, _dialogService, _validationRegistry, dataFieldPortalData);
    }

    ngOnInit() {
        this.checkProperties();
        this.subComp = this.dataField.componentChange$().subscribe(() => this.checkProperties());
    }

    protected checkProperties() {
        this.align = this.dataField.component?.properties?.align;
        this.stretch = this.dataField.component?.properties?.stretch === 'true';
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.subComp.unsubscribe();
    }
}
