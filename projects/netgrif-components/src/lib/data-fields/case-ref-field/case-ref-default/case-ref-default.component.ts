import {Component, Inject, Injector, Optional} from '@angular/core';
import {
    AbstractCaseRefDefaultComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    TaskRefField,
    ValidationRegistryService
} from '@netgrif/components-core';
import {
    DefaultCaseRefListViewComponent
} from '../../../navigation/group-navigation-component-resolver/default-components/default-case-ref-list-view/default-case-ref-list-view.component';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'nc-case-ref-default',
  templateUrl: './case-ref-default.component.html',
  styleUrls: ['./case-ref-default.component.scss']
})
export class CaseRefDefaultComponent extends AbstractCaseRefDefaultComponent {

    constructor(injector: Injector,
                _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TaskRefField>,
                _validationRegistry: ValidationRegistryService) {
        super(injector, DefaultCaseRefListViewComponent, _translate, dataFieldPortalData, _validationRegistry)
    }

}
