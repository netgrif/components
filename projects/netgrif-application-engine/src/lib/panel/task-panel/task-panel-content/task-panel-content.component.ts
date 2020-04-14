import {Component, Inject, InjectionToken} from '@angular/core';
import {DatafieldGridLayoutElement} from './datafield-grid-layout-element';
import {GridFiller} from '../../../utility/grid-layout/model/grid-filler';
import {FieldConvertorService} from './field-convertor.service';
import {TaskPanelContentService} from './task-panel-content.service';

export const NAE_TASK_COLS = new InjectionToken<number>('NaeTaskCols');

@Component({
    selector: 'nae-task-panel-content',
    templateUrl: './task-panel-content.component.html',
    styleUrls: ['./task-panel-content.component.scss']
})
export class TaskPanelContentComponent {
    dataSource: any[];
    formCols: number;
    loading: boolean;

    constructor(private _fieldConvertor: FieldConvertorService,
                private taskPanelContentService: TaskPanelContentService,
                @Inject(NAE_TASK_COLS) public taskCols) {
        this.loading = true;
        if (taskCols === undefined) {
            this.formCols = 4;
        } else {
            this.formCols = this.taskCols;
        }
        this.taskPanelContentService.$shouldCreate.subscribe(data => {
            console.time('time');
            if (data.length !== 0) {
                this.dataSource = this.fillBlankSpace(data, this.formCols);
            } else {
                this.dataSource = [];
            }
            console.timeEnd('time');
            this.loading = false;
        });
    }

    private static newGridRow(cols: number): Array<GridFiller> {
        return [new GridFiller(0, cols - 1)];
    }

    fillBlankSpace(resource: any[], columnCount: number): Array<DatafieldGridLayoutElement> {
        const grid: Array<Array<GridFiller>> = [];
        const returnResource = [];

        resource.forEach(dataGroup => {
            let count = 0;
            let columnGroup;
            if (dataGroup.cols !== undefined) {
                columnGroup = dataGroup.cols;
            } else {
                columnGroup = columnCount;
            }
            if (dataGroup.title && dataGroup.title !== '') {
                const row = grid.length;
                this.addGridRows(grid, row + 1, columnGroup);
                const newFillers = [];
                for (const filler of grid[row]) {
                    newFillers.push(...filler.fillersAfterCover(0, columnGroup - 1));
                }
                grid[row] = newFillers;
                returnResource.push({
                    item: undefined, type: 'title',
                    layout: {x: 0, y: row, cols: columnGroup, rows: 1}, title: dataGroup.title
                });
            }
            dataGroup.fields.sort((a, b) => a.order - b.order);
            dataGroup.fields.forEach(dataField => {
                if (dataField.layout !== undefined) {
                    const itemRowEnd = dataField.layout.y + dataField.layout.rows - 1;
                    const itemColEnd = dataField.layout.x + dataField.layout.cols - 1;
                    if (itemRowEnd >= grid.length) {
                        this.addGridRows(grid, itemRowEnd + 1, columnGroup);
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
                } else {
                    if (dataGroup.stretch || columnGroup === 1) {
                        const newRow = grid.length;
                        this.addGridRows(grid, newRow + 1, columnGroup);
                        grid[newRow] = [];
                        if (!dataField.behavior.hidden) {
                            returnResource.push({
                                item: dataField, type: this._fieldConvertor.resolveType(dataField),
                                layout: {x: 0, y: newRow, cols: columnGroup, rows: 1}
                            });
                        }
                    } else {
                        let columnCenter = columnGroup / 2;
                        if ((columnGroup % 2) !== 0) {
                            columnCenter = (columnGroup + 1) / 2;
                        }
                        if ((count % 2) === 0) {
                            const newRow = grid.length;
                            this.addGridRows(grid, newRow + 1, columnGroup);
                            if (dataField.behavior.hidden) {
                                for (const filler of grid[newRow]) {
                                    filler.isIntentional = false;
                                }
                            } else {
                                const newFillers = [];
                                if (dataGroup.alignment === 'center' && (count + 1) === dataGroup.fields.length) {
                                    let columnStart = 0;
                                    let columnEnd = 2;
                                    if (columnGroup >= 3) {
                                        columnStart = 1;
                                        columnEnd = columnGroup - 2;
                                    }
                                    for (const filler of grid[newRow]) {
                                        newFillers.push(...filler.fillersAfterCover(columnStart, columnEnd));
                                    }
                                    returnResource.push({
                                        item: dataField, type: this._fieldConvertor.resolveType(dataField),
                                        layout: {x: columnStart, y: newRow, cols: columnGroup - columnEnd, rows: 1}
                                    });
                                } else if (dataGroup.alignment === 'end' && (count + 1) === dataGroup.fields.length) {
                                    for (const filler of grid[newRow]) {
                                        newFillers.push(...filler.fillersAfterCover(columnCenter, columnGroup - 1));
                                    }
                                    returnResource.push({
                                        item: dataField, type: this._fieldConvertor.resolveType(dataField),
                                        layout: {x: columnCenter, y: newRow, cols: columnGroup - columnCenter, rows: 1}
                                    });
                                } else {
                                    for (const filler of grid[newRow]) {
                                        newFillers.push(...filler.fillersAfterCover(0, columnCenter - 1));
                                    }
                                    returnResource.push({
                                        item: dataField, type: this._fieldConvertor.resolveType(dataField),
                                        layout: {x: 0, y: newRow, cols: columnCenter, rows: 1}
                                    });
                                }
                                grid[newRow] = newFillers;
                            }
                            count++;
                        } else {
                            const row = grid.length - 1;
                            if (dataField.behavior.hidden) {
                                for (const filler of grid[row]) {
                                    filler.isIntentional = false;
                                }
                            } else {
                                returnResource.push({
                                    item: dataField, type: this._fieldConvertor.resolveType(dataField),
                                    layout: {x: columnCenter, y: row, cols: columnGroup - columnCenter, rows: 1}
                                });
                                grid[row] = [];
                            }
                            count++;
                        }
                    }
                }
            });
        });
        resource.forEach(dataGroup => {
            returnResource.push(...dataGroup.fields.filter(item => !item.behavior.hidden && item.layout !== undefined)
                .map(item => ({item, type: this._fieldConvertor.resolveType(item), layout: item.layout})));
        });
        let encounterFirst = false;
        for (let y = grid.length - 1; y > 0; y--) {
            const row = grid[y];
            row.forEach(filler => {
                if (!encounterFirst && !filler.isFullWidth(columnCount)) {
                    encounterFirst = true;
                }
                if (encounterFirst && (filler.isIntentional || !filler.isFullWidth(columnCount))) {
                    returnResource.push(filler.convertToGridElement(y));
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
}
