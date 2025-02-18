import {Component, Inject, Injector, Optional} from '@angular/core';
import {
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    AbstractMultichoiceCaseRefComponent,
    MultichoiceField
} from '@netgrif/components-core';
import {
    DefaultCaseRefListViewComponent
} from '../../../navigation/group-navigation-component-resolver/default-components/refs/default-case-ref-list-view/default-case-ref-list-view.component';

@Component({
  selector: 'nc-multichoice-caseref-field',
  templateUrl: './multichoice-caseref-field.component.html',
  styleUrls: ['./multichoice-caseref-field.component.scss']
})
export class MultichoiceCaserefFieldComponent extends AbstractMultichoiceCaseRefComponent {

    constructor(injector: Injector,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<MultichoiceField>) {
        super(injector, DefaultCaseRefListViewComponent, dataFieldPortalData)
    }
}
