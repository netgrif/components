import {EventEmitter, Inject, Input, OnDestroy, Optional, Output} from '@angular/core';
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
import {FieldTypeResource} from '../model/field-type-resource';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {NAE_ASYNC_RENDERING_CONFIGURATION} from '../model/async-rendering-configuration-injection-token';
import {AsyncRenderingConfiguration} from '../model/async-rendering-configuration';

export abstract class AbstractTaskContentComponent implements OnDestroy {
    readonly DEFAULT_LAYOUT_TYPE = DataGroupLayoutType.LEGACY;
    readonly DEFAULT_FIELD_ALIGNMENT = FieldAlignment.CENTER;
    readonly DEFAULT_ASYNC_RENDERING_CONFIGURATION: AsyncRenderingConfiguration = {
        batchSize: 4,
        batchDelay: 200,
        numberOfPlaceholders: 4,
        enableAsyncRenderingForNewFields: true,
        enableAsyncRenderingOnTaskExpand: true
    };

    /**
     * Indicates whether data is being loaded from backend, or if it is being processed.
     */
    loading$: LoadingEmitter;
    /**
     * Emits `true` if there is at least one data field, that should be displayed. Emits `false` otherwise.
     */
    hasDataToDisplay$: Observable<boolean>;
    /**
     * The number of columns used by the tasks layout
     */
    formCols = 4;
    defaultAlignment: FieldAlignment;

    /**
     * Exists to allow references to the enum in the HTML
     */
    public fieldTypeResource = FieldTypeResource;

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
    /**
     * Grid area identifiers that are already in use
     */
    protected _existingIdentifiers: Set<string>;
    /**
     * The data fields that are currently displayed
     */
    protected _dataSource$: BehaviorSubject<Array<DatafieldGridLayoutElement>>;
    protected _subTaskContent: Subscription;
    protected _subTaskEvent: Subscription;
    protected _asyncRenderingConfig: AsyncRenderingConfiguration;
    protected _asyncRenderTimeout?: number;

    protected constructor(protected _fieldConverter: FieldConverterService,
                          public taskContentService: TaskContentService,
                          protected _paperView: PaperViewService,
                          protected _logger: LoggerService,
                          @Optional() protected _taskEventService: TaskEventService | null = null,
                          @Optional() @Inject(NAE_ASYNC_RENDERING_CONFIGURATION)
                              asyncRenderingConfiguration: AsyncRenderingConfiguration | null = null) {
        this._asyncRenderingConfig = {...this.DEFAULT_ASYNC_RENDERING_CONFIGURATION};
        if (asyncRenderingConfiguration !== null) {
            Object.assign(this._asyncRenderingConfig, asyncRenderingConfiguration);
        }

        this.loading$ = new LoadingEmitter(true);
        this._dataSource$ = new BehaviorSubject<Array<DatafieldGridLayoutElement>>([]);
        this.hasDataToDisplay$ = this._dataSource$.pipe(map(data => {
            return data.length !== 0;
        }));

        this._subTaskContent = this.taskContentService.$shouldCreate.subscribe(data => {
            if (data.length !== 0) {
                this.computeDefaultAlignment();
                this.formCols = this.getNumberOfFormColumns();
                this.computeLayoutData(data);
            } else {
                this._dataSource$.next([]);
            }
            this.loading$.off();
        });
        if (this._taskEventService !== null) {
            this.taskEvent = new EventEmitter<TaskEventNotification>();
            this._subTaskEvent = this._taskEventService.taskEventNotifications$.subscribe(event => {
                this.taskEvent.emit(event);
            });
        }
    }

    ngOnDestroy(): void {
        this.loading$.complete();
        this._dataSource$.complete();
        this._subTaskContent.unsubscribe();
        if (this.taskEvent) {
            this.taskEvent.complete();
        }
        if (this._subTaskEvent) {
            this._subTaskEvent.unsubscribe();
        }
        if (this._asyncRenderTimeout !== undefined) {
            window.clearTimeout(this._asyncRenderTimeout);
        }
    }

    public get taskId(): string | undefined {
        return this.taskContentService.task?.stringId;
    }

    public get dataSource(): Array<DatafieldGridLayoutElement> {
        return this._dataSource$.getValue();
    }

    /**
     * @returns the columns configuration for the grid layout
     */
    public getGridColumns(): string {
        return 'repeat(' + this.formCols + ', 1fr)';
    }

    /**
     * @returns the rows configuration for the grid layout
     */
    public getGridRows(): string {
        let rowConfig = '';
        for (const row of this.gridAreas.split('|')) {
            rowConfig = rowConfig.concat(row.includes('xgroup') ? 'auto' : 'minmax(105px, auto)', ' ') ;
        }
        return rowConfig.trim();
    }

    /**
     * @returns the number of columns as specified by the tasks layout property, or 4 if no value is specified.
     */
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

    /**
     * @param item an object containing grid element information
     * @returns the Angular flex layouts alignment property for individual data fields based on
     * the layout configuration specified by the process
     */
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

    /**
     * @returns the default alignment for the displayed task that can be overridden by fields individual property.
     * If te task specifies no default value the [global default]{@link AbstractTaskContentComponent#DEFAULT_FIELD_ALIGNMENT}
     * value is returned.
     */
    protected computeDefaultAlignment() {
        this.defaultAlignment = this.taskContentService.task
        && this.taskContentService.task.layout
        && this.taskContentService.task.layout.fieldAlignment
            ? this.taskContentService.task.layout.fieldAlignment
            : this.DEFAULT_FIELD_ALIGNMENT;
    }

    /**
     * Computes the layout data for the tasks grid layout and sets the result to the public properties
     * of this class that are then bound to HTML.
     * @param dataGroups the data groups that should be laid out
     */
    public computeLayoutData(dataGroups: Array<DataGroup>) {
        if (!this.taskContentService.task) {
            this._dataSource$.next([]);
            this.gridAreas = '';
            return;
        }
        this._existingIdentifiers = new Set<string>();

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

            if (group.title !== undefined) {
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
                    throw new Error(`Unknown task layout type '${this.taskContentService.task?.layout?.type}'`);
            }
        });

        this.fillEmptySpace(gridData);
        this.renderFields(gridData.gridElements);
        this.gridAreas = this.createGridAreasString(gridData.grid);
    }

    protected renderFields(gridElements: Array<DatafieldGridLayoutElement>) {
        if (!this._asyncRenderingConfig.enableAsyncRenderingForNewFields
            && !(this._asyncRenderingConfig.enableAsyncRenderingOnTaskExpand && this.taskContentService.isExpanding)) {
            this._dataSource$.next(gridElements);
            return;
        }

        const currentElements = this._dataSource$.value;
        const currentTrackByIds = new Set<string>();
        currentElements.forEach((element, index) => {
            currentTrackByIds.add(this.trackByDatafields(index, element));
        });

        const keptElements: Array<DatafieldGridLayoutElement> = [];
        const newElements: Array<DatafieldGridLayoutElement> = [];
        if (this.taskContentService.isExpanding && this._asyncRenderingConfig.enableAsyncRenderingOnTaskExpand) {
            newElements.push(...gridElements);
        } else {
            gridElements.forEach((element, index) => {
                if (currentTrackByIds.has(this.trackByDatafields(index, element))) {
                    keptElements.push(element);
                } else {
                    newElements.push(element);
                }
            });
        }

        this.spreadFieldRenderingOverTime(keptElements, newElements);
    }

    protected spreadFieldRenderingOverTime(keptElements: Array<DatafieldGridLayoutElement>,
                                           newElements: Array<DatafieldGridLayoutElement>,
                                           iteration = 1) {
        this._asyncRenderTimeout = undefined;
        const fieldsInCurrentIteration = newElements.slice(0, iteration * (this._asyncRenderingConfig.batchSize as number));
        const placeholdersInCurrentIteration = newElements.slice(iteration * (this._asyncRenderingConfig.batchSize as number),
            iteration * (this._asyncRenderingConfig.batchSize as number) + (this._asyncRenderingConfig.numberOfPlaceholders as number));

        fieldsInCurrentIteration.push(
            ...placeholdersInCurrentIteration.map(field => ({gridAreaId: field.gridAreaId, type: TaskElementType.LOADER})));

        this._dataSource$.next([...keptElements, ...fieldsInCurrentIteration]);
        if ((this._asyncRenderingConfig.batchSize as number) * iteration < newElements.length) {
            this._asyncRenderTimeout = window.setTimeout(() => {
                this.spreadFieldRenderingOverTime(keptElements, newElements, iteration + 1);
            }, this._asyncRenderingConfig.batchDelay);
        }
    }

    /**
     * Creates a duplicate of the provided data group array and filters away any fields and data groups that are marked as hidden.
     * Because of the duplication the filtering doesn't affect the original instances and they remain unchanged.
     * @param dataGroups the data groups that should be filtered
     * @returns the filtered duplicated data groups
     */
    protected cloneAndFilterHidden(dataGroups: Array<DataGroup>): Array<DataGroup> {
        const result = dataGroups.map(group => {
            const g = {...group};
            g.fields = g.fields.filter(field => !field.behavior.hidden
                && !field.behavior.forbidden
                && this._fieldConverter.resolveType(field) !== FieldTypeResource.TASK_REF);
            return g;
        });

        return result.filter(group => group.fields.length > 0);
    }

    /**
     * Computes the layout data for a single data group with grid layout. The resulting layout is saved into the input objects.
     * @param dataGroup the data group that should be laid out into a grid
     * @param gridData the I/O object that holds the information about the layout that was computed so far
     */
    protected computeGridLayout(dataGroup: DataGroup, gridData: GridData) {
        const localGrid: Array<Array<string>> = [];

        dataGroup.fields.forEach(dataField => {
            if (!dataField.layout
                || dataField.layout.x === undefined
                || dataField.layout.y === undefined
                || !dataField.layout.rows
                || !dataField.layout.cols) {
                throw new Error(
                    `You cannot use 'grid' layout without specifying the layout of the data fields (field ID: ${dataField.stringId})`);
            }

            while (localGrid.length < dataField.layout.y + dataField.layout.rows) {
                localGrid.push(this.newGridRow());
            }

            const fieldElement = this.fieldElement(dataField);
            gridData.gridElements.push(fieldElement);
            this.occupySpace(localGrid, dataField.layout.y, dataField.layout.x,
                dataField.layout.cols, fieldElement.gridAreaId, dataField.layout.rows);
        });

        this.collapseGridEmptySpace(localGrid);

        localGrid.forEach(localGridRow => gridData.grid.push(localGridRow));
    }

    /**
     * Removes empty rows and shifts all grid elements up if they have enough space above them.
     *
     * The input grid is modified in place.
     * @param grid the state of the grid that should be modified
     */
    protected collapseGridEmptySpace(grid: Array<Array<string>>) {
        this.removeEmptyRows(grid);

        for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
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

                    // the only rows that can be totally empty are the ones we cleared by moving the grid element up
                    this.removeEmptyRows(grid, foundElementRowIndex, foundElementRowIndex + elementDimensions.height);
                }
            }
        }
    }

    /**
     * Removes rows from the grid that only contain empty elements (are empty). The grid is modified in place.
     * @param grid the grid that should have it's empty rows removed
     * @param firstRow the 0 based index of the first row that should be checked. Use 0 to start from the beginning of the grid.
     *
     * If no value is provided, the grid will be checked from the first row.
     *
     * @param lastRow the 0 based index of the row where the checking should end. The row with this index is not checked.
     *
     * If no value is provided the entire grid from the `firstRow` will be checked.
     *
     * If a value that is smaller or equal to the `firstRow` is provided no checks will be preformed.
     */
    protected removeEmptyRows(grid: Array<Array<string>>, firstRow = 0, lastRow = Number.POSITIVE_INFINITY) {
        let i = firstRow;
        while (i < grid.length && i < lastRow) {
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

    /**
     * Computes the layout data for a single data group with flow layout. The resulting layout is saved into the input objects.
     * @param dataGroup the data group that should be laid out into a grid using the flow algorithm
     * @param gridData the I/O object that holds the information about the layout that was computed so far
     */
    protected computeFlowLayout(dataGroup: DataGroup, gridData: GridData) {
        this.flowFields(dataGroup, gridData, 1);
    }

    /**
     * Computes the layout data for a single data group with legacy layout. The resulting layout is saved into the input objects.
     *
     * The legacy layout forces the number of columns to be 4 and logs a warning if this was not the case.
     * @param dataGroup the data group that should be laid out into a grid using the legacy algorithm used in NAE versions < 4.0.0
     * @param gridData the I/O object that holds the information about the layout that was computed so far
     */
    protected computeLegacyLayout(dataGroup: DataGroup, gridData: GridData) {
        if (this.formCols !== 4) {
            this.formCols = 4;
            this._logger.warn(`Task with id '${this.taskContentService.task?.stringId}' has legacy layout with a non-default number` +
                ` of columns. If you want to use a layout with different number of columns than 2 use a different layout type instead.`);
        }

        this.flowFields(dataGroup, gridData, 2);
    }

    /**
     * Lays out the fields from left to right, from top to bottom. If the width is greater than 1 and the block of flowed fields doesn't fit
     * neatly into the columns (if the width of a single field is not a divisor of column count), then the entire block of fields is
     * left aligned. The last row of fields is aligned to the left, center or right based on the data groups property.
     * If the last row cannot be aligned to the exact center it is offset one grid tile to the left.
     * @param dataGroup the data group that should be laid out into a grid
     * @param gridData the I/O object that holds the information about the layout that was computed so far
     * @param fieldWidth the number of grid tiles, that should be occupied by each field
     */
    protected flowFields(dataGroup: DataGroup, gridData: GridData, fieldWidth: number) {
        const fieldsPerRow = Math.floor(this.formCols / fieldWidth);
        const maxXPosition = fieldWidth * (fieldsPerRow - 1);

        let xPosition = 0;
        dataGroup.fields.forEach((dataField, dataFieldCount) => {
            const fieldElement = this.fieldElement(dataField);
            gridData.gridElements.push(fieldElement);
            if (dataGroup.stretch) {
                gridData.grid.push(this.newGridRow(fieldElement.gridAreaId));
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
            this.occupySpace(gridData.grid, gridData.grid.length - 1, xPosition, fieldWidth, fieldElement.gridAreaId);

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
        return {
            title: dataGroup.title,
            gridAreaId: this.assureUniqueness('group' + titleCounter.next()),
            type: TaskElementType.DATA_GROUP_TITLE
        };
    }

    /**
     * @param field the field whose representation should be created
     * @returns an object that represents the provided data field in the layout
     */
    protected fieldElement(field: DataField<unknown>): DatafieldGridLayoutElement {
        return {gridAreaId: this.assureUniqueness(field.stringId), type: this._fieldConverter.resolveType(field), item: field};
    }

    /**
     * @param fillerCounter the counter that is used to track the number of already created filler elements
     * @returns a filler element object with a unique ID. The provided counter is incremented by one.
     */
    protected fillerElement(fillerCounter: IncrementingCounter): DatafieldGridLayoutElement {
        return {gridAreaId: this.assureUniqueness('blank' + fillerCounter.next()), type: TaskElementType.BLANK};
    }

    /**
     * Assures that the provided identifier will be unique.
     * @param identifier the base for the identifier
     * @returns the base identifier, if it already is unique. A unique variation on the base identifier if it is already in use.
     */
    protected assureUniqueness(identifier: string): string {
        const alphaNumIdentifier = 'x' + identifier.replace(/[^0-9a-zA-Z]/gi, '');
        if (!this._existingIdentifiers.has(alphaNumIdentifier)) {
            this._existingIdentifiers.add(alphaNumIdentifier);
            return alphaNumIdentifier;
        }
        let variation;
        const counter = new IncrementingCounter();
        do {
            variation = `x${counter.next()}${alphaNumIdentifier}`;
        } while (this._existingIdentifiers.has(variation));
        this._existingIdentifiers.add(variation);
        return variation;
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

    public trackByFn = (index: number, element: DatafieldGridLayoutElement) => this.trackByDatafields(index, element);

    protected trackByDatafields(index: number, element: DatafieldGridLayoutElement) {
        switch (element.type) {
            case TaskElementType.BLANK:
                return element.gridAreaId + '-' + this.taskContentService.$shouldCreateCounter.getValue();
            case TaskElementType.LOADER:
                return element.gridAreaId + '-L-' + this.taskContentService.$shouldCreateCounter.getValue();
            case TaskElementType.DATA_GROUP_TITLE:
                return element.title + '-' + this.taskContentService.$shouldCreateCounter.getValue();
            default:
                if (element.item === undefined) {
                    this._logger.errorAndThrow(new Error(`Grid element '${element.gridAreaId}' holds no item`));
                }
                return element.item.stringId + '-' + this.taskContentService.$shouldCreateCounter.getValue();
        }
    }
}
