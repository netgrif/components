import {Component, Inject, OnInit, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractButtonFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA, DialogService} from '@netgrif/components-core';

@Component({
    selector: 'nc-button-field',
    templateUrl: './button-field.component.html',
    styleUrls: ['./button-field.component.scss']
})
export class ButtonFieldComponent extends AbstractButtonFieldComponent implements OnInit {

    public align: string;
    public stretch: string;

    constructor(translate: TranslateService,
                protected dialogService: DialogService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(translate,  dialogService, informAboutInvalidData);
    }


    ngOnInit() {
        super.ngOnInit();
        if (this.dataField.component && this.dataField.component.properties &&
            this.dataField.component.properties.align) {
            this.align = this.dataField.component.properties.align;
        }
        if (this.dataField.component && this.dataField.component.properties &&
            this.dataField.component.properties.stretch) {
            this.stretch = this.dataField.component.properties.stretch;
        }
    }
}
