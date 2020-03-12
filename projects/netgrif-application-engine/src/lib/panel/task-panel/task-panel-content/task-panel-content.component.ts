import {Component, OnInit} from '@angular/core';
import {Resources} from './resources';
import {DataFieldResource} from './resource-service';
import {BooleanField} from '../../../data-fields/boolean-field/boolean-field';
import {TextField, TextFieldView} from '../../../data-fields/text-field/text-field';
import {NumberField} from '../../../data-fields/number-field/number-field';
import {
    EnumerationField,
    EnumerationFieldValue,
    EnumerationFieldView
} from '../../../data-fields/enumeration-field/enumeration-field';
import {
    MultichoiceField,
    MultichoiceFieldValue,
    MultichoiceFieldView
} from '../../../data-fields/multichoice-field/multichoice-field';
import {DateField} from '../../../data-fields/date-field/date-field';
import {DateTimeField} from '../../../data-fields/date-time-field/date-time-field';
import {UserField} from '../../../data-fields/user-field/user-field';
import {User} from '../../../side-menu/user-assign/user';
import {ButtonField} from '../../../data-fields/button-field/button-field';
import {FileField} from '../../../data-fields/file-field/file-field';

@Component({
  selector: 'nae-task-panel-content',
  templateUrl: './task-panel-content.component.html',
  styleUrls: ['./task-panel-content.component.scss']
})
export class TaskPanelContentComponent implements OnInit {
  resources: any[];
  formCols: number;

  constructor() {
      console.time('start');
      // TODO number of columns must come from backend (from form builder in transition)
      this.resources = this.fillBlankSpace(Resources.data, 4);
      console.timeEnd('start');
      this.formCols = Resources.cols;
  }

  ngOnInit(): void {
  }

  fillBlankSpace(resource: any[], numberOfColumns: number) {
    const grid: boolean[][] = [];
    const fillers = new Map<number, >
    let rows = 0;

    resource.forEach(item => {
        for (let i = item.layout.y; i < item.layout.y + item.layout.rows; i++) {
            for (let j = item.layout.x; j < item.layout.x + item.layout.cols; j++) {
                console.log(i);
                console.log(j);
                grid[i][j] = true;
            }
        }
    });
    const returnResource = resource.map(item => ( {item: this.toClass(item), type: item.type, layout: item.layout}));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < numberOfColumns; j++) {
            if (grid[i][j] === false) {
                returnResource.push( {item: undefined, type: 'blank', layout: {x: j, y: i, cols: 1, rows: 1}} );
            }
        }
    }
    return returnResource.sort((a, b) => {
        if (a.layout.y < b.layout.y) {
            return -1;
        } else if (a.layout.y > b.layout.y) {
            return 1;
        }
        if (a.layout.x < b.layout.x) {
            return -1;
        } else if (a.layout.x > b.layout.x) {
            return 1;
        }
        console.log(a, b);
        console.log('illegal');
        return 0;
    });
  }

  private newGridRow(cols: number): boolean[] {
      return Array<boolean>(cols).fill(false);
  }

  toClass(item: DataFieldResource): any {
      switch (item.type) {
          case 'boolean': return new BooleanField(item.stringId, item.name, item.value as boolean, item.behavior,
              item.placeholder, item.description);
          case 'text':
              let type = TextFieldView.DEFAULT;
              if (item.view && item.view.value !== undefined) {if (item.view.value === 'area' ) { type = TextFieldView.TEXTAREA; }}
              return new TextField(item.stringId, item.name, item.value as string, item.behavior, item.placeholder,
                  item.description, item.validationJS, 'standard', type);
          case 'number': return new NumberField(item.stringId, item.name, item.value as number, item.behavior,
              item.validationJS, item.placeholder, item.description);
          case 'enumeration':
              let typeEnum = EnumerationFieldView.DEFAULT;
              if (item.view && item.view.value !== undefined) {
                  if (item.view.value === 'list' ) { typeEnum = EnumerationFieldView.LIST; } else
                      if (item.view.value === 'autocomplete' ) { typeEnum = EnumerationFieldView.AUTOCOMPLETE; }
              }
              const choices: EnumerationFieldValue[] = [];
              item.choices.forEach(it => { choices.push({key: it, value: it} as EnumerationFieldValue); });
              return new EnumerationField(item.stringId, item.name,
              {key: item.value as string, value: item.value as string} as EnumerationFieldValue,
              choices, item.behavior, item.placeholder, item.description, 'standard', typeEnum);
          case 'multichoice':
              let typeMulti = MultichoiceFieldView.DEFAULT;
              if (item.view && item.view.value !== undefined) {
                  if (item.view.value === 'list' ) { typeMulti = MultichoiceFieldView.LIST; }
              }
              const values: MultichoiceFieldValue[] = [];
              (item.value as string[]).forEach(it => { values.push({key: it, value: it} as MultichoiceFieldValue); });
              const choicesMulti: MultichoiceFieldValue[] = [];
              item.choices.forEach(it => { choicesMulti.push({key: it, value: it} as MultichoiceFieldValue); });
              return new MultichoiceField(item.stringId, item.name, values, choicesMulti, item.behavior,
                  item.placeholder, item.description, 'standard', typeMulti);
          case 'date':
              const date = new Date(item.minDate);
              return new DateField(item.stringId, item.name, date, item.placeholder, item.description);
          case 'dateTime':
              const dateTime = new Date();
              return new DateTimeField(item.stringId, item.name, dateTime, item.behavior, item.placeholder, item.description);
          case 'user': return new UserField(item.stringId, item.name, item.behavior, new User('name',
              'surname', 'email'), item.roles, item.placeholder, item.description);
          case 'button': return new ButtonField(item.stringId, item.name, item.behavior, item.value as string,
              item.placeholder, item.description);
          case 'file': return new FileField(item.stringId, item.name, item.behavior, undefined, item.placeholder, item.description);
      }
  }

}
