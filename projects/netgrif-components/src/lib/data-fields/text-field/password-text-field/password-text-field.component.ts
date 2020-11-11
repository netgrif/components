import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractPasswordTextFieldComponent} from '@netgrif/application-engine';

@Component({
  selector: 'nc-password-text-field',
  templateUrl: './password-text-field.component.html',
  styleUrls: ['./password-text-field.component.scss']
})
export class PasswordTextFieldComponent extends AbstractPasswordTextFieldComponent implements OnInit {

    hide: boolean;

    constructor(protected _translate: TranslateService) {
        super(_translate);
        this.hide = true;
    }

  ngOnInit(): void {
  }

}
