import {Component, Input, OnInit} from '@angular/core';
import {TextField} from '../models/text-field';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';

@Component({
  selector: 'nae-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent implements OnInit {

  @Input() textAreaField: TextField;
  @Input() showLargeLayout: WrappedBoolean;

  ngOnInit() {
  }

}
