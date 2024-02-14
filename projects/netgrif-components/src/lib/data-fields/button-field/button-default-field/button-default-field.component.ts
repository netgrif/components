import {Component, Inject, OnInit, Optional} from '@angular/core';
import {
    AbstractButtonDefaultFieldComponent, ButtonField,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    DialogService
} from '@netgrif/components-core';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'nc-button-default-field',
    templateUrl: './button-default-field.component.html',
    styleUrls: ['./button-default-field.component.scss']
})
export class ButtonDefaultFieldComponent extends AbstractButtonDefaultFieldComponent implements OnInit {

    public align: string;
    public stretch: string;

    constructor(_translate: TranslateService,
                _dialogService: DialogService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<ButtonField>) {
        super(_translate, _dialogService, dataFieldPortalData);
    }

    ngOnInit() {
        if (this.dataField.component?.properties?.align) {
            this.align = this.dataField.component.properties.align;
        }
        if (this.dataField.component?.properties?.stretch) {
            this.stretch = this.dataField.component.properties.stretch;
        }
    }
}
