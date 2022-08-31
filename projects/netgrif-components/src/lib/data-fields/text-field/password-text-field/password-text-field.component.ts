import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractPasswordTextFieldComponent} from '@netgrif/components-core';

@Component({
  selector: 'nc-password-text-field',
  templateUrl: './password-text-field.component.html',
  styleUrls: ['./password-text-field.component.scss']
})
export class PasswordTextFieldComponent extends AbstractPasswordTextFieldComponent {

    hide: boolean;

    constructor(protected _translate: TranslateService) {
        super(_translate);
        this.hide = true;
    }
}
