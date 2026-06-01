import { Component, Optional, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AbstractFilterStringQueryFieldComponent,  DATA_FIELD_PORTAL_DATA, DataFieldPortalData, FilterField} from '@netgrif/components-core';

@Component({
  selector: 'nc-filter-string-query-field',
  templateUrl: './filter-string-query-field.component.html',
  styleUrls: ['./filter-string-query-field.component.scss']
})
export class FilterStringQueryFieldComponent extends AbstractFilterStringQueryFieldComponent {

    constructor(protected _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<FilterField>) {
        super(_translate, dataFieldPortalData);
    }

}
