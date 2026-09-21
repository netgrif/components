import {Component, Inject, Injector, OnInit, Optional} from '@angular/core';
import {
    AbstractHeaderComponent,
    CaseHeaderService,
    CategoryFactory,
    HeaderSearchService,
    TaskHeaderService,
    WorkflowHeaderService,
    OverflowService, MultichoiceField, DATA_FIELD_PORTAL_DATA, DataFieldPortalData, EnumerationField
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [
        CaseHeaderService,
        TaskHeaderService,
        WorkflowHeaderService,
        HeaderSearchService,
        CategoryFactory
    ]
})
export class HeaderComponent extends AbstractHeaderComponent implements OnInit {
    protected _changeValue: boolean;

    constructor(injector: Injector,
                translate: TranslateService,
                @Optional() overflowService: OverflowService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) protected _dataFieldPortalData: DataFieldPortalData<MultichoiceField>) {
        super(injector, translate, overflowService);
        this._changeValue = true;
    }

    public indeterminate() {
        return this._dataFieldPortalData?.dataField?.value?.length > 0 &&
            this._dataFieldPortalData?.dataField?.value?.length < this._dataFieldPortalData?.dataField?.choices?.length;
    }

    public typeApproval() {
        return this._dataFieldPortalData?.dataField instanceof MultichoiceField ? 'multichoice' : 'enumeration';
    }

    ngOnInit() {
        super.ngOnInit();
        if (this._dataFieldPortalData !== null && this._dataFieldPortalData.dataField instanceof MultichoiceField) {
            this.approvalFormControl.setValue(this._dataFieldPortalData?.dataField.value.length === this._dataFieldPortalData?.dataField.choices.length);
            this.approvalFormControl.valueChanges.subscribe(value => {
                if (this._changeValue) {
                    if (value) {
                        this._dataFieldPortalData.dataField.value = this._dataFieldPortalData?.dataField.choices.map(val => val.key);
                    } else {
                        this._dataFieldPortalData.dataField.value = [];
                    }
                }
                this._changeValue = true;
            })
            this._dataFieldPortalData.dataField.valueChanges().subscribe(() => {
                this._changeValue = false;
                this.approvalFormControl.setValue(this._dataFieldPortalData?.dataField.value.length === this._dataFieldPortalData?.dataField.choices.length);
            })
        }
        if (this._dataFieldPortalData !== null && this._dataFieldPortalData.dataField instanceof EnumerationField) {
            this.approvalFormControl.valueChanges.subscribe(value => {
                this._dataFieldPortalData.dataField.value = null;
            })
        }
    }
}
