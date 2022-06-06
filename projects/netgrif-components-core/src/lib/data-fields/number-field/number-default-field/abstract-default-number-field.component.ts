import {TranslateService} from '@ngx-translate/core';
import {AbstractNumberErrorsComponent} from '../abstract-number-errors.component';
import {Component} from '@angular/core';

@Component({
    selector: 'ncc-abstract-number-default-field',
    template: ''
})
export abstract class AbstractDefaultNumberFieldComponent extends AbstractNumberErrorsComponent {

    protected constructor(translateService: TranslateService) {
        super(translateService);
    }
}
