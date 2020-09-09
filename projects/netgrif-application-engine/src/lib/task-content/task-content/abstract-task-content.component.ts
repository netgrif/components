import {EventEmitter, Input, Output} from '@angular/core';
import {DatafieldGridLayoutElement} from '../model/datafield-grid-layout-element';
import {GridFiller} from '../../utility/grid-layout/model/grid-filler';
import {FieldConverterService} from '../services/field-converter.service';
import {TaskContentService} from '../services/task-content.service';
import {PaperViewService} from '../../navigation/quick-panel/components/paper-view.service';
import {LoggerService} from '../../logger/services/logger.service';
import {TaskEventNotification} from '../model/task-event-notification';
import {TaskEventService} from '../services/task-event.service';
import {DataGroup, DataGroupAlignment} from '../../resources/interface/data-groups';
import {TaskLayoutType} from '../../resources/interface/task-layout';
import {IncrementingCounter} from '../../utility/incrementing-counter';
import {TaskElementType} from '../model/task-content-element-type';
import {DataField} from '../../data-fields/models/abstract-data-field';

export abstract class AbstractTaskContentComponent {
    dataSource: Array<DatafieldGridLayoutElement>;
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
    /**
     * Emits notifications about task events
     */
    @Output() taskEvent: EventEmitter<TaskEventNotification>;
    /**
     * Describes the layout of the elements
     */
    gridAreas: string;

    protected constructor(protected _fieldConverter: FieldConverterService,
                          public taskContentService: TaskContentService,
                          protected _paperView: PaperViewService,
                          protected _logger: LoggerService,
                          protected _taskEventService: TaskEventService = null) {
        this.loading = true;
        this.taskContentService.$shouldCreate.subscribe(data => {
            if (data.length !== 0) {
                this.formCols = this.getNumberOfFormColumns();
                this.computeLayoutData(data);
            } else {
                this.dataSource = [];
            }
            this.loading = false;
        });
        if (this._taskEventService !== null) {
            this.taskEvent = new EventEmitter<TaskEventNotification>();
            _taskEventService.taskEventNotifications$.subscribe(event => {
                this.taskEvent.emit(event);
            });
        }
    }

    protected static newGridRow(cols: number): Array<GridFiller> {
        return [new GridFiller(0, cols - 1)];
    }

    public getGridColumns(): string {
        return 'repeat(' + this.formCols + ', 1fr)';
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

    computeLayoutData(dataGroups: Array<DataGroup>) {
        if (!this.taskContentService.task) {
            this.dataSource = [];
            this.gridAreas = '';
        }

        let grid;
        switch (this.taskContentService.task.layout.type) {
            case TaskLayoutType.GRID:
                grid = this.computeGridLayout(dataGroups);
                break;
            case TaskLayoutType.FLOW:
                grid = this.computeFlowLayout(dataGroups);
                break;
            case TaskLayoutType.LEGACY:
                grid = this.computeLegacyLayout(dataGroups);
                break;
            default:
                throw new Error(`Unknown task layout type '${this.taskContentService.task.layout.type}'`);
        }
    }

    computeGridLayout(dataGroups: Array<DataGroup>) {

    }

    computeFlowLayout(dataGroups: Array<DataGroup>) {

    }

    computeLegacyLayout(dataGroups: Array<DataGroup>) {
        if (this.formCols !== 4) {
            this.formCols = 4;
            this._logger.warn(`Task with id '${this.taskContentService.task.stringId}' has legacy layout with a non-default number` +
                ` of columns. If you want to use a layout with different number of columns than 2 use a different layout type instead.`);
        }

        const grid: Array<Array<string>> = [];
        const gridElements: Array<DatafieldGridLayoutElement> = [];
        const runningTitleCount = new IncrementingCounter();

        dataGroups.forEach(dataGroup => {
            const isGroupVisible = dataGroup.fields.some(dataField => !dataField.behavior.hidden);
            if (!isGroupVisible) {
                return; // continue
            }

            if (dataGroup.title && dataGroup.title !== '') {
                const title = this.groupTitleElement(dataGroup, runningTitleCount);
                gridElements.push(title);
                grid.push(this.gridRow(title.gridAreaId));
            }

            let firstInRow = true;
            dataGroup.fields.forEach((dataField, dataFieldCount) => {
                gridElements.push(this.fieldElement(dataField));
                if (dataGroup.stretch) {
                    grid.push(this.gridRow(dataField.stringId));
                } else {
                    if (firstInRow) {
                        grid.push(this.gridRow());
                        if (this.isLastInDataGroup(dataFieldCount, dataGroup) && dataGroup.alignment === DataGroupAlignment.CENTER) {
                            this.occupySpace(grid, grid.length - 1, 1, 2, dataField.stringId);
                        } else if (this.isLastInDataGroup(dataFieldCount, dataGroup) && dataGroup.alignment === DataGroupAlignment.END) {
                            this.occupySpace(grid, grid.length - 1, 2, 2, dataField.stringId);
                        } else {
                            this.occupySpace(grid, grid.length - 1, 0, 2, dataField.stringId);
                        }

                    } else {
                        this.occupySpace(grid, grid.length - 1, 2, 2, dataField.stringId);
                    }
                    firstInRow = !firstInRow;
                }
            });
        });
    }

    protected gridRow(content = ''): Array<string> {
        return Array(this.formCols).fill(content);
    }

    protected groupTitleElement(dataGroup: DataGroup, titleCounter: IncrementingCounter): DatafieldGridLayoutElement {
        return {title: dataGroup.title, gridAreaId: 'group#' + titleCounter.next(), type: TaskElementType.DATA_GROUP_TITLE};
    }

    protected fieldElement(field: DataField<unknown>): DatafieldGridLayoutElement {
        return {gridAreaId: field.stringId, type: this._fieldConverter.resolveType(field), item: field};
    }

    protected fillerElement(fillerCounter: IncrementingCounter): DatafieldGridLayoutElement {
        return {gridAreaId: 'blank#' + fillerCounter.next(), type: TaskElementType.BLANK};
    }

    protected occupySpace(grid: Array<Array<string>>, row: number, col: number, width: number, value: string) {
        for (let i = col; i < col + width; i++) {
            grid[row][i] = value;
        }
    }

    protected isLastInDataGroup(index: number, dataGroup: DataGroup): boolean {
        return index + 1 === dataGroup.fields.length;
    }

    protected fillEmptySpace(grid: Array<Array<string>>, gridElements: Array<DatafieldGridLayoutElement>) {
        const runningBlanksCount = new IncrementingCounter();
        grid.forEach(row => {
            for (let i = 0; row.length; i++) {
                if (row[i] !== '') {
                    continue;
                }
                const filler = this.fillerElement(runningBlanksCount);
                row[i] = filler.gridAreaId;
                gridElements.push(filler);
            }
        });
    }

    protected createGridAreasString(grid: Array<Array<string>>): string {
        return grid.map(row => row.join(' ')).join(' | ');
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

    protected addGridRows(grid: Array<Array<GridFiller>>, newRowCount: number, columnCount: number): void {
        while (grid.length < newRowCount) {
            grid.push(AbstractTaskContentComponent.newGridRow(columnCount));
        }
    }

    protected computeGridAreas(): string {
        const areas: Array<Array<string>> = [];
        let blanks = 0;
        let titles = 0;
        this.dataSource.forEach(element => {
            while (areas.length < (element.layout.y + element.layout.rows)) {
                areas.push(Array(this.formCols).fill(''));
            }

            let uniqueIdentifier: string;
            if (element.type !== 'blank' && element.type !== 'title') {
                uniqueIdentifier = element.item.stringId;
            } else if (element.type === 'blank') {
                uniqueIdentifier = 'blank' + blanks;
                blanks++;
            } else {
                uniqueIdentifier = 'title' + titles;
                titles++;
            }

            element.gridAreaId = uniqueIdentifier;

            for (let i = element.layout.x; i < element.layout.x + element.layout.cols; i++) {
                for (let j = element.layout.y; j < element.layout.y + element.layout.rows; j++) {
                    areas[j][i] = uniqueIdentifier;
                }
            }
        });

        return areas.map(row => row.join(' ')).join(' | ');
    }
}
