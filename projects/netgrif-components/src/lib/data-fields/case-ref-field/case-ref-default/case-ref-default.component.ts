import {Component, Inject, Injector, Optional} from '@angular/core';
import {
    AbstractCaseRefDefaultComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    TaskRefField
} from '@netgrif/components-core';
import {
    DefaultCaseRefListViewComponent
} from '../../../navigation/group-navigation-component-resolver/default-components/default-case-ref-list-view/default-case-ref-list-view.component';

@Component({
  selector: 'nc-case-ref-default',
  templateUrl: './case-ref-default.component.html',
  styleUrls: ['./case-ref-default.component.scss']
})
export class CaseRefDefaultComponent extends AbstractCaseRefDefaultComponent {

    constructor(injector: Injector,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TaskRefField>) {
        super(injector, DefaultCaseRefListViewComponent, dataFieldPortalData)
    }

}
