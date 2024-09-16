import {Component, Inject, Injector, Optional} from '@angular/core';
import {
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, EnumerationField,
    AbstractEnumerationCaseRefComponent,
    ValidationRegistryService
} from '@netgrif/components-core';
import {
    DefaultCaseRefListViewComponent
} from '../../../navigation/group-navigation-component-resolver/default-components/default-case-ref-list-view/default-case-ref-list-view.component';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'nc-enumeration-caseref-field',
  templateUrl: './enumeration-caseref-field.component.html',
  styleUrls: ['./enumeration-caseref-field.component.scss']
})
export class EnumerationCaserefFieldComponent extends AbstractEnumerationCaseRefComponent {

    constructor(injector: Injector,
                _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>,
                _validationRegistry: ValidationRegistryService){
        super(injector, DefaultCaseRefListViewComponent, _translate, dataFieldPortalData, _validationRegistry)
    }
}
