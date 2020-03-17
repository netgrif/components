import {Component, Input, OnInit} from '@angular/core';
import {TextField} from '../models/text-field';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'nae-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent implements OnInit {

  @Input() textAreaField: TextField;
  @Input() formControlRef: FormControl;
  @Input() showLargeLayout: WrappedBoolean;

  ngOnInit() {
  }

}
