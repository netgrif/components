import {Component, Inject, OnInit} from '@angular/core';
import {Resources} from './resources';
import {DataFieldResource} from './resource-service';
import {BooleanField} from '../../../data-fields/boolean-field/models/boolean-field';
import {TextField, TextFieldView} from '../../../data-fields/text-field/models/text-field';
import {NumberField} from '../../../data-fields/number-field/models/number-field';
import {
    EnumerationField,
    EnumerationFieldValue,
    EnumerationFieldView
} from '../../../data-fields/enumeration-field/models/enumeration-field';
import {
    MultichoiceField,
    MultichoiceFieldValue,
    MultichoiceFieldView
} from '../../../data-fields/multichoice-field/models/multichoice-field';
import {DateField} from '../../../data-fields/date-field/models/date-field';
import {DateTimeField} from '../../../data-fields/date-time-field/models/date-time-field';
import {UserField} from '../../../data-fields/user-field/models/user-field';
import {User} from '../../../side-menu/user-assign/user';
import {ButtonField} from '../../../data-fields/button-field/models/button-field';
import {FileField} from '../../../data-fields/file-field/models/file-field';
import {DataField} from '../../../data-fields/models/abstract-data-field';
import {GridLayoutElement} from './grid-layout-element';
import {GridFiller} from './grid-filler';
import {NAE_TASK_DATA} from '../../../panel-list/task-data-injection-token/task-data-injection-token.module';

@Component({
    selector: 'nae-task-panel-content',
    templateUrl: './task-panel-content.component.html',
    styleUrls: ['./task-panel-content.component.scss']
})
export class TaskPanelContentComponent implements OnInit {

    constructor(@Inject(NAE_TASK_DATA) public taskResources) {
        console.time('start');
        // TODO number of columns must come from backend (from form builder in transition)
        this.resources = this.fillBlankSpace(Resources.data, 4);
        console.timeEnd('start');
        this.formCols = Resources.cols;
    }
    resources: any[];
    formCols: number;

    private static newGridRow(cols: number): Array<GridFiller> {
        return [new GridFiller(0, cols - 1)];
    }

    ngOnInit(): void {
    }

    fillBlankSpace(resource: any[], columnCount: number): Array<GridLayoutElement> {
        const grid: Array<Array<GridFiller>> = [];

        resource.forEach(dataField => {
            const itemRowEnd = dataField.layout.y + dataField.layout.rows - 1;
            const itemColEnd = dataField.layout.x + dataField.layout.cols - 1;
            if (itemRowEnd >= grid.length) {
                this.addGridRows(grid, itemRowEnd + 1, columnCount);
            }
            for (let row = dataField.layout.y; row <= itemRowEnd; row++) {
                if (dataField.behavior.hidden) {
                    for (const filler of grid[row]) {
                        filler.isIntentional = false;
                    }
                } else {
                    const newFillers = [];
                    for (const filler of grid[row]) {
                        newFillers.push(...filler.fillersAfterCover(dataField.layout.x, itemColEnd));
                    }
                    grid[row] = newFillers;
                }
            }
        });

        const returnResource = resource.filter( item => !item.behavior.hidden)
            .map(item => ({item: this.toClass(item), type: item.type, layout: item.layout}));
        let encounterFirst = false;
        for (let y = grid.length - 1; y > 0 ; y--) {
            const row = grid[y];
            row.forEach( filler => {
                if (!encounterFirst && !filler.isFullWidth(columnCount)) {
                    encounterFirst = true;
                }
                if (encounterFirst && ( filler.isIntentional || !filler.isFullWidth(columnCount))) {
                    returnResource.push(filler.convertToGridLayoutElement(y));
                }
            });
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

    private addGridRows(grid: Array<Array<GridFiller>>, newRowCount: number, columnCount: number): void {
        while (grid.length < newRowCount) {
            grid.push(TaskPanelContentComponent.newGridRow(columnCount));
        }
    }

    toClass(item: DataFieldResource): DataField<any> {
        switch (item.type) {
            case 'boolean':
                return new BooleanField(item.stringId, item.name, item.value as boolean, item.behavior,
                    item.placeholder, item.description);
            case 'text':
                let type = TextFieldView.DEFAULT;
                if (item.view && item.view.value !== undefined) {
                    if (item.view.value === 'area') {
                        type = TextFieldView.TEXTAREA;
                    }
                }
                return new TextField(item.stringId, item.name, item.value as string, item.behavior, item.placeholder,
                    item.description, item.validationJS, 'standard', type);
            case 'number':
                return new NumberField(item.stringId, item.name, item.value as number, item.behavior,
                    item.validationJS, item.placeholder, item.description, 'outline');
            case 'enumeration':
                let typeEnum = EnumerationFieldView.DEFAULT;
                if (item.view && item.view.value !== undefined) {
                    if (item.view.value === 'list') {
                        typeEnum = EnumerationFieldView.LIST;
                    } else if (item.view.value === 'autocomplete') {
                        typeEnum = EnumerationFieldView.AUTOCOMPLETE;
                    }
                }
                const choices: EnumerationFieldValue[] = [];
                item.choices.forEach(it => {
                    choices.push({key: it, value: it} as EnumerationFieldValue);
                });
                return new EnumerationField(item.stringId, item.name,
                    {key: item.value as string, value: item.value as string} as EnumerationFieldValue,
                    choices, item.behavior, item.placeholder, item.description, 'standard', typeEnum);
            case 'multichoice':
                let typeMulti = MultichoiceFieldView.DEFAULT;
                if (item.view && item.view.value !== undefined) {
                    if (item.view.value === 'list') {
                        typeMulti = MultichoiceFieldView.LIST;
                    }
                }
                const values: MultichoiceFieldValue[] = [];
                (item.value as string[]).forEach(it => {
                    values.push({key: it, value: it} as MultichoiceFieldValue);
                });
                const choicesMulti: MultichoiceFieldValue[] = [];
                item.choices.forEach(it => {
                    choicesMulti.push({key: it, value: it} as MultichoiceFieldValue);
                });
                return new MultichoiceField(item.stringId, item.name, values, choicesMulti, item.behavior,
                    item.placeholder, item.description, 'standard', typeMulti);
            case 'date':
                const date = new Date(item.minDate);
                return new DateField(item.stringId, item.name, date, item.behavior, item.placeholder, item.description);
            case 'dateTime':
                const dateTime = new Date();
                return new DateTimeField(item.stringId, item.name, dateTime, item.behavior, item.placeholder, item.description);
            case 'user':
                return new UserField(item.stringId, item.name, item.behavior, new User('name',
                    'surname', 'email'), item.roles, item.placeholder, item.description);
            case 'button':
                return new ButtonField(item.stringId, item.name, item.behavior, item.value as string,
                    item.placeholder, item.description);
            case 'file':
                return new FileField(item.stringId, item.name, item.behavior, undefined, item.placeholder, item.description);
        }
    }

}
