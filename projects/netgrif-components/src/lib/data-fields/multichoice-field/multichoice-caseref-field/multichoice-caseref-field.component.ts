import {Component, Inject, Injector, Optional} from '@angular/core';
import {
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    AbstractMultichoiceCaseRefComponent,
    MultichoiceField,
    ValidationRegistryService
} from '@netgrif/components-core';
import {
    DefaultCaseRefListViewComponent
} from '../../../navigation/group-navigation-component-resolver/default-components/default-case-ref-list-view/default-case-ref-list-view.component';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'nc-multichoice-caseref-field',
  templateUrl: './multichoice-caseref-field.component.html',
  styleUrls: ['./multichoice-caseref-field.component.scss']
})
export class MultichoiceCaserefFieldComponent extends AbstractMultichoiceCaseRefComponent {

    constructor(injector: Injector,
                _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<MultichoiceField>,
                _validationRegistry: ValidationRegistryService) {
        super(injector, DefaultCaseRefListViewComponent, _translate, dataFieldPortalData, _validationRegistry)
    }
}
