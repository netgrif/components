import {Component} from '@angular/core';
import {AbstractNumberFieldComponent} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'nc-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss']
})
export class NumberFieldComponent extends AbstractNumberFieldComponent {
    constructor(protected _translate: TranslateService) {
        super(_translate);
    }
}
