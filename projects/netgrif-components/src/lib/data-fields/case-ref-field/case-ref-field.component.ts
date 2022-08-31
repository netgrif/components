import {Component, Input} from '@angular/core';
import {CaseRefField} from '@netgrif/components-core';

@Component({
  selector: 'nc-case-ref-field',
  templateUrl: './case-ref-field.component.html',
  styleUrls: ['./case-ref-field.component.scss']
})
export class CaseRefFieldComponent {

    @Input() public dataField: CaseRefField;

    constructor(){
    }
}
