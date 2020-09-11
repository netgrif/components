import {EventEmitter, Input, Output} from '@angular/core';
import {DatafieldGridLayoutElement} from '../model/datafield-grid-layout-element';
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
import {FieldAlignment} from '../../resources/interface/field-alignment';

export abstract class AbstractTaskContentComponent {
    readonly DEFAULT_LAYOUT_TYPE = DataGroupLayoutType.LEGACY;
    readonly DEFAULT_FIELD_ALIGNMENT = FieldAlignment.CENTER;

    dataSource: Array<DatafieldGridLayoutElement>;
    loading: boolean;
    formCols = 4;
    defaultAlignment: FieldAlignment;

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
                this.computeDefaultAlignment();
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

    public getItemAlignment(item: DatafieldGridLayoutElement): string {
        if (item.alignment) {
            return item.alignment;
        }

        const fieldAlignment = item.item && item.item.layout && item.item.layout.alignment
            ? item.item.layout.alignment
            : this.defaultAlignment;

        let alignment;
        switch (fieldAlignment) {
            case FieldAlignment.TOP:
                alignment = 'start';
                break;
            case FieldAlignment.CENTER:
                alignment = 'center';
                break;
            case FieldAlignment.BOTTOM:
                alignment = 'end';
                break;
        }

        item.alignment = 'space-between ' + alignment;
        return item.alignment;
    }

    protected computeDefaultAlignment() {
        this.defaultAlignment = this.taskContentService.task
        && this.taskContentService.task.layout
        && this.taskContentService.task.layout.fieldAlignment
            ? this.taskContentService.task.layout.fieldAlignment
            : this.DEFAULT_FIELD_ALIGNMENT;
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
            gridData.gridElements.push(this.fieldElement(dataField));
        });

        this.collapseGridEmptySpace(gridData.grid, firstGroupRow);
    }

    protected collapseGridEmptySpace(grid: Array<Array<string>>, firstRow: number) {
        this.removeEmptyRows(grid, firstRow);

        for (let rowIndex = firstRow; rowIndex < grid.length; rowIndex++) {
            const row = grid[rowIndex];

            for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
                if (row[columnIndex] !== '') {
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

    /**
     * Creates a new grid row of length equivalent to the [formCols]{@link AbstractTaskContentComponent#formCols} property of this class
     * @param content the value that should be used to fill all elements in the row
     */
    protected newGridRow(content = ''): Array<string> {
        return Array(this.formCols).fill(content);
    }

    /**
     * @param dataGroup the data group whose title element should be created
     * @param titleCounter the counter that is used to track the number of already created filler elements
     * @returns an object that represents a title element of the provided data group. The provided counter is incremented by one.
     */
    protected groupTitleElement(dataGroup: DataGroup, titleCounter: IncrementingCounter): DatafieldGridLayoutElement {
        return {title: dataGroup.title, gridAreaId: 'group' + titleCounter.next(), type: TaskElementType.DATA_GROUP_TITLE};
    }

    /**
     * @param field the field whose representation should be created
     * @returns an object that represents the provided data field in the layout
     */
    protected fieldElement(field: DataField<unknown>): DatafieldGridLayoutElement {
        return {gridAreaId: field.stringId, type: this._fieldConverter.resolveType(field), item: field};
    }

    /**
     * @param fillerCounter the counter that is used to track the number of already created filler elements
     * @returns a filler element object with a unique ID. The provided counter is incremented by one.
     */
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

    /**
     * @param index the index of the checked element within its data group
     * @param dataGroup the checked data group
     * @param fieldsPerRow the number of fields that is required to fill an entire row
     * @returns whether the field at the given index is within the last row of elements of the provided data group.
     * Note that if the last row contains enough elements to be completely filled this method returns `false`.
     */
    protected isLastRow(index: number, dataGroup: DataGroup, fieldsPerRow: number): boolean {
        return index + fieldsPerRow >= dataGroup.fields.length;
    }

    /**
     * Fills empty tiles in the grid with blank elements
     * @param gridData the grid and elements that should be filled with blank data
     */
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

    /**
     * Joins the provided grid of element into a string accepted by `[gdAreas]` input property of Angular flex layout
     * @param grid the grid of elements
     */
    protected createGridAreasString(grid: Array<Array<string>>): string {
        return grid.map(row => row.join(' ')).join(' | ');
    }
}
