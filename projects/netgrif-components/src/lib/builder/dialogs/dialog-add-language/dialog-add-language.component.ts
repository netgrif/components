import {Component} from '@angular/core';
import {I18nControlService} from "../../modeler/i18n-mode/i18n-control.service";

@Component({
  selector: 'nc-builder-dialog-add-language',
  templateUrl: './dialog-add-language.component.html',
  styleUrls: ['./dialog-add-language.component.scss'],
})
export class DialogAddLanguageComponent {

  selectedLanguage: any;

  constructor(public i18nModeService: I18nControlService) {
  }
}
