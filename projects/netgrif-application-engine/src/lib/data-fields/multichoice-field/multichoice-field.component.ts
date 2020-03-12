import {Component, Input, OnInit} from '@angular/core';
import {MultichoiceField} from "./models/multichoice-field";

@Component({
  selector: 'nae-multichoice-field',
  templateUrl: './multichoice-field.component.html',
  styleUrls: ['./multichoice-field.component.scss']
})
export class MultichoiceFieldComponent implements OnInit {

  @Input() multichoiceField: MultichoiceField;

  ngOnInit() {
  }

}
