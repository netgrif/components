import {Component, OnInit} from '@angular/core';
import {TextField, TextFieldView} from '@netgrif/application-engine';

@Component({
  selector: 'nae-app-covalent-text-editor',
  templateUrl: './covalent-text-editor.component.html',
  styleUrls: ['./covalent-text-editor.component.scss']
})
export class CovalentTextEditorComponent implements OnInit {
    readonly TITLE = 'Covalent text editor';
    readonly DESCRIPTION = 'Ukážka rich text arei...';
    textField: TextField;

  constructor() {
      this.textField = new TextField('id', 'title', 'value', {editable: true}, 'placeholder',
          'desc', undefined, undefined, TextFieldView.RICHTEXTAREA);
  }

  ngOnInit(): void {
  }

}
