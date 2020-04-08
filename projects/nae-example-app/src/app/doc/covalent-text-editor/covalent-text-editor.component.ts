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
      this.textField = new TextField('id', 'title', '# Intro\n' +
          '  Go ahead, play around with the editor! Be sure to check out **bold**' +
          ' and *italic* styling, or even [links](https://google.com).\n' +
          '  You can type the Markdown syntax, use the toolbar, or use shortcuts like \'cmd-b\' or \'ctrl-b\'.\n' +
          '  \n' +
          '  ## Lists\n' +
          '  Unordered lists can be started using the toolbar or by typing' +
          ' \'* \', \'- \', or \'+ \'. Ordered lists can be started by typing \'1. \'.\n' +
          '  \n' +
          '  #### Unordered\n' +
          '  * Lists are a piece of cake\n' +
          '  * They even auto continue as you type\n' +
          '  * A double enter will end them\n' +
          '  * Tabs and shift-tabs work too\n' +
          '  \n' +
          '  #### Ordered\n' +
          '  1. Numbered lists...\n' +
          '  2. ...work too!\n' +
          '  \n' +
          '  ## What about images?\n' +
          '  ![Yes](https://i.imgur.com/sZlktY7.png)\n' +
          '  ', {editable: true}, 'placeholder',
          'desc', undefined, undefined, TextFieldView.RICHTEXTAREA);
  }

  ngOnInit(): void {
  }

}
