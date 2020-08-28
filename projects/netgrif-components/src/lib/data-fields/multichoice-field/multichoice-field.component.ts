import {Component} from '@angular/core';
import {AbstractMultichoiceFieldComponent} from '@netgrif/application-engine';

@Component({
  selector: 'nc-multichoice-field',
  templateUrl: './multichoice-field.component.html',
  styleUrls: ['./multichoice-field.component.scss']
})
export class MultichoiceFieldComponent extends AbstractMultichoiceFieldComponent {

  constructor() {
      super();
  }
}
