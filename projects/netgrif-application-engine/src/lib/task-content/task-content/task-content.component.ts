import {Component, Input} from '@angular/core';
import {DatafieldGridLayoutElement} from '../model/datafield-grid-layout-element';
import {GridFiller} from '../../utility/grid-layout/model/grid-filler';
import {FieldConverterService} from '../services/field-converter.service';
import {TaskContentService} from '../services/task-content.service';
import {PaperViewService} from '../../navigation/quick-panel/components/paper-view.service';
import {LoggerService} from '../../logger/services/logger.service';

@Component({
    selector: 'nae-task-content',
    templateUrl: './task-content.component.html',
    styleUrls: ['./task-content.component.scss']
})
export class TaskContentComponent {
    dataSource: any[];
    loading: boolean;
    formCols = 4;

    /**
     * The translate text that should be displayed when the task contains no data.
     *
     * If a falsy value is provided the default text is displayed
     */
    @Input() noDataText: string;
    /**
     * The icon that should be displayed when the task contains no data.
     *
     * If a falsy value is provided the default icon is displayed
     */
    @Input() noDataIcon: string;
    /**
     * Whether an icon should be displayed when the no data message is shown.
     *
     * An icon is displayed by default
     */
    @Input() displayNoDataIcon = true;

    constructor(private _fieldConverter: FieldConverterService,
                private taskContentService: TaskContentService,
                private _paperView: PaperViewService,
                private _logger: LoggerService) {
        this.loading = true;
        this.taskContentService.$shouldCreate.subscribe(data => {
            if (data.length !== 0) {
                this.formCols = this.getNumberOfFormColumns();
                this.dataSource = this.fillBlankSpace(data, this.formCols);
            } else {
                this.dataSource = [];
            }
            this.loading = false;
        });
    }

    public get taskId(): string {
        return this.taskContentService.task.stringId;
    }

    private static newGridRow(cols: number): Array<GridFiller> {
        return [new GridFiller(0, cols - 1)];
    }

    public getNumberOfFormColumns(): number {
        if (!this.taskContentService.task
            || !this.taskContentService.task.layout
            || this.taskContentService.task.layout.cols === undefined) {
            return 4;
        } else {
            return this.taskContentService.task.layout.cols;
        }
    }

    public isPaperView() {
        return this._paperView.paperView;
    }

    fillBlankSpace(resource: any[], columnCount: number): Array<DatafieldGridLayoutElement> {
        const grid: Array<Array<GridFiller>> = [];
        const returnResource = [];
        const dataGroupTitles = [];

        resource.forEach(dataGroup => {
            let count = 0;
            let columnGroup;
            if (dataGroup.layout && dataGroup.layout.cols !== undefined) {
                columnGroup = dataGroup.layout.cols;
            } else {
                columnGroup = columnCount;
            }
            if (dataGroup.title && dataGroup.title !== '') {
                const visibleGroup: boolean = dataGroup.fields.some(dataFld => !dataFld.behavior.hidden);
                if (visibleGroup) {
                    const row = grid.length;
                    dataGroupTitles.push({
                        item: undefined, type: 'title',
                        layout: {x: 0, y: row, cols: columnGroup, rows: 1}, title: dataGroup.title
                    });
                }
            }
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
                                item: dataField, type: this._fieldConverter.resolveType(dataField),
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
                                        item: dataField, type: this._fieldConverter.resolveType(dataField),
                                        layout: {x: columnStart, y: newRow, cols: columnGroup - columnEnd, rows: 1}
                                    });
                                } else if (dataGroup.alignment === 'end' && (count + 1) === dataGroup.fields.length) {
                                    for (const filler of grid[newRow]) {
                                        newFillers.push(...filler.fillersAfterCover(columnCenter, columnGroup - 1));
                                    }
                                    returnResource.push({
                                        item: dataField, type: this._fieldConverter.resolveType(dataField),
                                        layout: {x: columnCenter, y: newRow, cols: columnGroup - columnCenter, rows: 1}
                                    });
                                } else {
                                    for (const filler of grid[newRow]) {
                                        newFillers.push(...filler.fillersAfterCover(0, columnCenter - 1));
                                    }
                                    returnResource.push({
                                        item: dataField, type: this._fieldConverter.resolveType(dataField),
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
                                    item: dataField, type: this._fieldConverter.resolveType(dataField),
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
                .map(item => ({item, type: this._fieldConverter.resolveType(item), layout: {...item.layout}})));
        });
        let encounterFirst = false;
        for (let y = grid.length - 1; y >= 0; y--) {
            const row = grid[y];
            if (row.length === 0) {
                encounterFirst = true;
            }
            for (const filler of row) {
                if (!encounterFirst && !filler.isFullWidth(columnCount)) {
                    encounterFirst = true;
                }
                if (encounterFirst && (filler.isIntentional || !filler.isFullWidth(columnCount))) {
                    returnResource.push(filler.convertToGridElement(y));
                }
            }
        }

        returnResource.sort((a, b) => {
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
            this._logger.warn(`Two data fields have overlapping layouts`, [a, b]);
            return 0;
        });

        if (dataGroupTitles.length > 0) {
            dataGroupTitles.sort((a, b) => {
                return a.layout.y - b.layout.y;
            });
            let lastDataGroupIndex = 0;
            for (let i = 0; i < returnResource.length && lastDataGroupIndex < dataGroupTitles.length; i++) {
                if (returnResource[i].layout.y < dataGroupTitles[lastDataGroupIndex].layout.y) {
                    continue;
                }
                returnResource.splice(i, 0, dataGroupTitles[lastDataGroupIndex]);
                lastDataGroupIndex += 1;
                for (let j = i + 1; j < returnResource.length; j++) {
                    returnResource[j].layout.y += 1;
                }
                for (let j = lastDataGroupIndex; j < dataGroupTitles.length; j++) {
                    dataGroupTitles[j].layout.y += 1;
                }
            }
        }
        return returnResource;
    }

    private addGridRows(grid: Array<Array<GridFiller>>, newRowCount: number, columnCount: number): void {
        while (grid.length < newRowCount) {
            grid.push(TaskContentComponent.newGridRow(columnCount));
        }
    }
}
