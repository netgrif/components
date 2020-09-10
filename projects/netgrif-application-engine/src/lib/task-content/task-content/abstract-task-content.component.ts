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
import {IncrementingCounter} from '../../utility/incrementing-counter';
import {TaskElementType} from '../model/task-content-element-type';
import {DataField} from '../../data-fields/models/abstract-data-field';
import {GridData} from '../model/grid-data';
import {DataGroupLayoutType} from '../../resources/interface/data-group-layout';

export abstract class AbstractTaskContentComponent {
    readonly DEFAULT_LAYOUT_TYPE = DataGroupLayoutType.LEGACY;

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

    protected computeLayoutData(dataGroups: Array<DataGroup>) {
        if (!this.taskContentService.task) {
            this.dataSource = [];
            this.gridAreas = '';
            return;
        }

        dataGroups = this.cloneAndFilterHidden(dataGroups);

        const gridData: GridData = {grid: [], gridElements: [], runningTitleCount: new IncrementingCounter()};

        const defaultLayout = this.taskContentService.task.layout && this.taskContentService.task.layout.type
            ? this.taskContentService.task.layout.type
            : this.DEFAULT_LAYOUT_TYPE;

        dataGroups.forEach(group => {
            if (!group.layout) {
                group.layout = {rows: undefined, cols: undefined, type: defaultLayout};
            }
            if (!group.layout.type) {
                group.layout.type = defaultLayout;
            }

            if (group.title && group.title !== '') {
                const title = this.groupTitleElement(group, gridData.runningTitleCount);
                gridData.gridElements.push(title);
                gridData.grid.push(this.newGridRow(title.gridAreaId));
            }

            switch (group.layout.type) {
                case DataGroupLayoutType.GRID:
                    this.computeGridLayout(group, gridData);
                    break;
                case DataGroupLayoutType.FLOW:
                    this.computeFlowLayout(group, gridData);
                    break;
                case DataGroupLayoutType.LEGACY:
                    this.computeLegacyLayout(group, gridData);
                    break;
                default:
                    throw new Error(`Unknown task layout type '${this.taskContentService.task.layout.type}'`);
            }
        });

        this.fillEmptySpace(gridData);
        this.dataSource = gridData.gridElements;
        this.gridAreas = this.createGridAreasString(gridData.grid);
    }

    protected cloneAndFilterHidden(dataGroups: Array<DataGroup>): Array<DataGroup> {
        const result = dataGroups.map(group => {
            const g = {...group};
            g.fields = g.fields.filter(field => !field.behavior.hidden && !field.behavior.forbidden);
            return g;
        });

        return result.filter(group => group.fields.length > 0);
    }

    protected computeGridLayout(dataGroup: DataGroup, gridData: GridData) {
        const firstGroupRow = gridData.grid.length;
        dataGroup.fields.forEach(dataField => {
            if (!dataField.layout
                || dataField.layout.x === undefined
                || dataField.layout.y === undefined
                || !dataField.layout.rows
                || !dataField.layout.cols) {
                throw new Error(
                    `You cannot use 'grid' layout without specifying the layout of the data fields (field ID: ${dataField.stringId})`);
            }

            while (gridData.grid.length <= dataField.layout.y + dataField.layout.rows) {
                gridData.grid.push(this.newGridRow());
            }

            this.occupySpace(gridData.grid, dataField.layout.y, dataField.layout.x,
                dataField.layout.cols, dataField.stringId, dataField.layout.rows);
        });

        this.collapseGridEmptySpace(gridData.grid, firstGroupRow);
    }

    protected collapseGridEmptySpace(grid: Array<Array<string>>, firstRow: number) {
        this.removeEmptyRows(grid, firstRow);

        for (let rowIndex = firstRow; rowIndex < grid.length; rowIndex++) {
            const row = grid[rowIndex];
            const availableSpace = this.getFreeRowSpace(row);

            for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
                if (availableSpace[columnIndex] === 0) {
                    continue;
                }

                let foundElement = false;
                let foundElementRowIndex = rowIndex + 1;
                for (; foundElementRowIndex < grid.length; foundElementRowIndex++) {
                    if (grid[foundElementRowIndex][columnIndex] !== '') {
                        foundElement = true;
                        break;
                    }
                }
                if (!foundElement) {
                    continue;
                }

                if (columnIndex > 0 && grid[foundElementRowIndex][columnIndex - 1] === grid[foundElementRowIndex][columnIndex]) {
                    continue;
                }

                const elementDimensions = this.getElementDimensions(grid, columnIndex, foundElementRowIndex);

                if (this.isAreaEmpty(grid, columnIndex, rowIndex, elementDimensions.width, foundElementRowIndex - rowIndex)) {
                    const element = grid[foundElementRowIndex][columnIndex];
                    this.occupySpace(grid, foundElementRowIndex, columnIndex, elementDimensions.width, '', elementDimensions.height, false);
                    this.occupySpace(grid, rowIndex, columnIndex, elementDimensions.width, element, elementDimensions.height, false);
                }
            }
        }

        this.removeEmptyRows(grid, firstRow);
    }

    protected removeEmptyRows(grid: Array<Array<string>>, firstRow: number) {
        let i = firstRow;
        while (i < grid.length) {
            if (grid[i].every(element => element === '')) {
                grid.splice(i, 1);
            } else {
                i++;
            }
        }
    }

    protected getFreeRowSpace(row: Array<string>): Array<number> {
        const result = Array(this.formCols);

        let runningFreeSpace = 0;
        for (let i = row.length - 1; i >= 0; i--) {
            if (row[i] === '') {
                runningFreeSpace++;
            } else {
                runningFreeSpace = 0;
            }
            result[i] = runningFreeSpace;
        }

        return result;
    }

    /**
     * Determines the dimensions of the element in the grid with its top-left corner at the specified position
     * @param grid the grid of elements
     * @param x the X coordinate of the desired elements top-left corner
     * @param y the Y coordinate of the desired elements top-left corner
     * @returns the width and height of the specified element
     */
    protected getElementDimensions(grid: Array<Array<string>>, x: number, y: number): { width: number, height: number } {
        const element = grid[y][x];
        let width = 1;
        while (x + width < this.formCols && grid[y][x + width] === element) {
            width++;
        }
        let height = 1;
        while (y + height < grid.length && grid[y + height][x] === element) {
            height++;
        }
        return {width, height};
    }

    /**
     * Determines whether the specified area in the grid contains no elements, or not
     * @param grid the grid of elements
     * @param x the X coordinate of the tested areas top-left corner
     * @param y the Y coordinate of the tested areas top-left corner
     * @param width the width of the tested area
     * @param height the height of the tested area
     */
    protected isAreaEmpty(grid: Array<Array<string>>, x: number, y: number, width: number, height: number): boolean {
        for (let i = y; i < y + height; i++) {
            for (let j = x; j < x + width; j++) {
                if (grid[i][j] !== '') {
                    return false;
                }
            }
        }
        return true;
    }

    protected computeFlowLayout(dataGroup: DataGroup, gridData: GridData) {
        this.flowFields(dataGroup, gridData, 1);
    }

    protected computeLegacyLayout(dataGroup: DataGroup, gridData: GridData) {
        if (this.formCols !== 4) {
            this.formCols = 4;
            this._logger.warn(`Task with id '${this.taskContentService.task.stringId}' has legacy layout with a non-default number` +
                ` of columns. If you want to use a layout with different number of columns than 2 use a different layout type instead.`);
        }

        this.flowFields(dataGroup, gridData, 2);
    }

    protected flowFields(dataGroup: DataGroup, gridData: GridData, fieldWidth: number) {
        const fieldsPerRow = Math.floor(this.formCols / fieldWidth);
        const maxXPosition = fieldWidth * (fieldsPerRow - 1);

        let xPosition = 0;
        dataGroup.fields.forEach((dataField, dataFieldCount) => {
            gridData.gridElements.push(this.fieldElement(dataField));
            if (dataGroup.stretch) {
                gridData.grid.push(this.newGridRow(dataField.stringId));
                return; // continue
            }
            // else
            if (xPosition === 0) {
                gridData.grid.push(this.newGridRow());
            }
            if (xPosition === 0 && this.isLastRow(dataFieldCount, dataGroup, fieldsPerRow)) {
                const fieldsInLastRow = dataGroup.fields.length % fieldsPerRow;
                const rowWidth = maxXPosition + fieldWidth;
                if (dataGroup.alignment === DataGroupAlignment.END) {
                    xPosition = rowWidth - fieldWidth * fieldsInLastRow;
                } else if (dataGroup.alignment === DataGroupAlignment.CENTER) {
                    xPosition = Math.floor((rowWidth - fieldsInLastRow * fieldWidth) / 2);
                }
            }
            this.occupySpace(gridData.grid, gridData.grid.length - 1, xPosition, fieldWidth, dataField.stringId);

            xPosition += fieldWidth;
            if (xPosition > maxXPosition) {
                xPosition = 0;
            }
        });
    }

    protected newGridRow(content = ''): Array<string> {
        return Array(this.formCols).fill(content);
    }

    protected groupTitleElement(dataGroup: DataGroup, titleCounter: IncrementingCounter): DatafieldGridLayoutElement {
        return {title: dataGroup.title, gridAreaId: 'group' + titleCounter.next(), type: TaskElementType.DATA_GROUP_TITLE};
    }

    protected fieldElement(field: DataField<unknown>): DatafieldGridLayoutElement {
        return {gridAreaId: field.stringId, type: this._fieldConverter.resolveType(field), item: field};
    }

    protected fillerElement(fillerCounter: IncrementingCounter): DatafieldGridLayoutElement {
        return {gridAreaId: 'blank' + fillerCounter.next(), type: TaskElementType.BLANK};
    }

    /**
     * Fills the specified rectangular area with the specified value in the provided grid.
     *
     * If the specified area contains values other than the empty string an error will be thrown.
     * @param grid the grid that should be modified
     * @param y the 0 based row index of the top-left corner of the filled area
     * @param x the 0 based column index of the top-left corner of the filled area
     * @param width the width of the filled area
     * @param value the value that is set into every cell of the grid inside the specified area
     * @param height the height of the filled area
     * @param checkOccupants whether the filled area should be checked for other elements.
     * If a check is performed an error will be thrown if elements are found.
     */
    protected occupySpace(grid: Array<Array<string>>, y: number, x: number, width: number,
                          value: string, height = 1, checkOccupants = true) {
        for (let j = y; j < y + height; j++) {
            for (let i = x; i < x + width; i++) {
                if (checkOccupants && grid[j][i] !== '') {
                    throw new Error(`Cannot place element ${value} into the grid layout, because it's space (x: ${i}, y: ${j})` +
                        ` is already occupied by another element (${grid[j][i]})`);
                }
                grid[j][i] = value;
            }
        }
    }

    protected isLastRow(index: number, dataGroup: DataGroup, fieldsPerRow: number): boolean {
        return index + fieldsPerRow >= dataGroup.fields.length;
    }

    protected fillEmptySpace(gridData: GridData) {
        const runningBlanksCount = new IncrementingCounter();
        gridData.grid.forEach(row => {
            for (let i = 0; i < row.length; i++) {
                if (row[i] !== '') {
                    continue;
                }
                const filler = this.fillerElement(runningBlanksCount);
                row[i] = filler.gridAreaId;
                gridData.gridElements.push(filler);
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
}
