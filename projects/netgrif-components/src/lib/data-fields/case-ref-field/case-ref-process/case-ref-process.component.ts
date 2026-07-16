import {AfterViewInit, Component, Inject, Injector, Optional} from '@angular/core';
import {
    AbstractCaseRefProcessComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    CaseRefField
} from '@netgrif/components-core';
import {BuilderComponent} from '../../../builder/builder.component';

@Component({
  selector: 'nc-case-ref-process',
  templateUrl: './case-ref-process.component.html',
  styleUrls: ['./case-ref-process.component.scss']
})
export class CaseRefProcessComponent extends AbstractCaseRefProcessComponent implements AfterViewInit {

    constructor(injector: Injector,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<CaseRefField>) {
        super(injector, BuilderComponent, dataFieldPortalData)
    }

    ngAfterViewInit() {
        this.createPortal();
    }
}
