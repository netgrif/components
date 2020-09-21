import {Component} from '@angular/core';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {AbstractDateFieldComponent, DATE_FORMAT} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'nc-date-field',
    templateUrl: './date-field.component.html',
    styleUrls: ['./date-field.component.scss'],
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT}
    ]
})
export class DateFieldComponent extends AbstractDateFieldComponent {
    constructor(protected _translate: TranslateService) {
        super(_translate);
    }
}
