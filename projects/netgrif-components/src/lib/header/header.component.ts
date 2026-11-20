import {Component, Inject, Injector, Optional} from '@angular/core';
import {
    AbstractHeaderComponent,
    CaseHeaderService,
    CategoryFactory,
    HeaderSearchService,
    TaskHeaderService,
    WorkflowHeaderService,
    OverflowService, MultichoiceField, DATA_FIELD_PORTAL_DATA, DataFieldPortalData, CaseViewService
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
export class HeaderComponent extends AbstractHeaderComponent {

    constructor(injector: Injector,
                translate: TranslateService,
                @Optional() overflowService: OverflowService,
                @Optional() protected _caseViewService: CaseViewService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) protected _dataFieldPortalData: DataFieldPortalData<MultichoiceField>) {
        super(injector, translate, overflowService, _caseViewService, _dataFieldPortalData);
    }
}
