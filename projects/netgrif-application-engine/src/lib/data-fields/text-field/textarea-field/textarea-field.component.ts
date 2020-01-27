import {Component, Input, OnInit} from '@angular/core';
import {TextField} from "../text-field";

@Component({
  selector: 'nae-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent implements OnInit {

  @Input() textAreaField: TextField;

  ngOnInit() {
  }

}
