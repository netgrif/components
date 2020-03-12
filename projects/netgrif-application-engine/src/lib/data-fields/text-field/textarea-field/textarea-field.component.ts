import {Component, Input, OnInit} from '@angular/core';
import {TextField} from "../text-field";
import {WrappedBoolean} from "../../data-field-template/wrapped-boolean";

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
