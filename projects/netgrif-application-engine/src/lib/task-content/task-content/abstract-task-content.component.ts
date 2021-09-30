import {EventEmitter, Inject, Input, OnDestroy, Optional, Output} from '@angular/core';
import {DatafieldGridLayoutElement} from '../model/datafield-grid-layout-element';
import {FieldConverterService} from '../services/field-converter.service';
import {TaskContentService} from '../services/task-content.service';
import {PaperViewService} from '../../navigation/quick-panel/components/paper-view.service';
import {LoggerService} from '../../logger/services/logger.service';
import {TaskEventNotification} from '../model/task-event-notification';
import {TaskEventService} from '../services/task-event.service';
import {DataGroup, DataGroupAlignment} from '../../resources/interface/data-groups';
import {TaskElementType} from '../model/task-content-element-type';
import {DataField} from '../../data-fields/models/abstract-data-field';
import {DataGroupCompact, DataGroupHideEmptyRows, DataGroupLayout, DataGroupLayoutType} from '../../resources/interface/data-group-layout';
import {FieldAlignment} from '../../resources/interface/field-alignment';
import {FieldTypeResource} from '../model/field-type-resource';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {NAE_ASYNC_RENDERING_CONFIGURATION} from '../model/async-rendering-configuration-injection-token';
import {AsyncRenderingConfiguration} from '../model/async-rendering-configuration';
import {TaskRefField} from '../../data-fields/task-ref-field/model/task-ref-field';
import {SplitDataGroup} from '../model/split-data-group';
import {Subgrid} from '../model/subgrid';
import {IncrementingCounter} from '../../utility/incrementing-counter';

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
    readonly DEFAULT_COMPACT_DIRECTION = DataGroupCompact.NONE;
    readonly DEFAULT_HIDE_EMPTY_ROWS = DataGroupHideEmptyRows.ALL;

    /**
     * Indicates whether data is being loaded from backend, or if it is being processed.
     */
    loading$: LoadingEmitter;
    /**
     * Emits `true` if there is at least one data field, that should be displayed. Emits `false` otherwise.
     */
    hasDataToDisplay$: Observable<boolean>;

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
     * The data fields that are currently displayed
     */
    protected _dataSource$: BehaviorSubject<Array<Subgrid>>;
    protected _subTaskContent: Subscription;
    protected _subTaskEvent: Subscription;
    protected _asyncRenderingConfig: AsyncRenderingConfiguration;
    protected _asyncRenderTimeout: number;

    protected _defaultAlignment: FieldAlignment;
    protected _defaultCompactDirection: DataGroupCompact;
    protected _defaultHideEmptyRows: DataGroupHideEmptyRows;
    protected _defaultNumberOfCols: number;

    protected _subgridIdCounter: IncrementingCounter;
    protected _existingSubgridIds: Set<string>;

    protected constructor(protected _fieldConverter: FieldConverterService,
                          public taskContentService: TaskContentService,
                          protected _paperView: PaperViewService,
                          protected _logger: LoggerService,
                          @Optional() protected _taskEventService: TaskEventService = null,
                          @Optional() @Inject(NAE_ASYNC_RENDERING_CONFIGURATION)
                              asyncRenderingConfiguration: AsyncRenderingConfiguration = null) {
        this._asyncRenderingConfig = {...this.DEFAULT_ASYNC_RENDERING_CONFIGURATION};
        if (asyncRenderingConfiguration !== null) {
            Object.assign(this._asyncRenderingConfig, asyncRenderingConfiguration);
        }

        this.loading$ = new LoadingEmitter(true);
        this._dataSource$ = new BehaviorSubject<Array<Subgrid>>([]);
        this.hasDataToDisplay$ = this._dataSource$.pipe(map(data => {
            return data.length !== 0;
        }));

        this._subTaskContent = this.taskContentService.$shouldCreate.subscribe(data => {
            if (data.length !== 0) {
                this.computeDefaultLayoutConfiguration();
                this.computeLayoutData(data);
            } else {
                this.renderContent();
            }
            this.loading$.off();
        });
        if (this._taskEventService !== null) {
            this.taskEvent = new EventEmitter<TaskEventNotification>();
            this._subTaskEvent = _taskEventService.taskEventNotifications$.subscribe(event => {
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

    public get taskId(): string {
        return this.taskContentService.task.stringId;
    }

    public get dataSource(): Array<Subgrid> {
        return this._dataSource$.getValue();
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

        const fieldAlignment = item.item?.localLayout?.alignment ?? this._defaultAlignment;

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
    protected computeDefaultLayoutConfiguration() {
        this._defaultAlignment = this.taskContentService.task?.layout?.fieldAlignment ?? this.DEFAULT_FIELD_ALIGNMENT;
        this._defaultCompactDirection = this.taskContentService.task?.layout?.compactDirection ?? this.DEFAULT_COMPACT_DIRECTION;
        this._defaultHideEmptyRows = this.taskContentService.task?.layout?.hideEmptyRows ?? this.DEFAULT_HIDE_EMPTY_ROWS;
        this._defaultNumberOfCols = this.getNumberOfFormColumns();
    }

    /**
     * Computes the layout data for the tasks grid layout and sets the result to the public properties
     * of this class that are then bound to HTML.
     * @param dataGroups the data groups that should be laid out
     */
    public computeLayoutData(dataGroups: Array<DataGroup>) {
        if (!this.taskContentService.task) {
            this.renderContent();
            return;
        }

        this._subgridIdCounter = new IncrementingCounter();
        this._existingSubgridIds = new Set<string>();

        const result = new Map<string, Subgrid>();

        dataGroups = this.preprocessDataGroups(dataGroups);

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

            const subgrid = new Subgrid(
                this.createSubgridId(group),
                group.layout.cols ?? this._defaultNumberOfCols,
                this._asyncRenderingConfig
            );

            if (group.title !== undefined) {
                const title = subgrid.addTitle(group);
                subgrid.addRow(this.newGridRow(subgrid.cols, title.gridAreaId));
            }

            switch (group.layout.type) {
                case DataGroupLayoutType.GRID:
                    this.computeGridLayout(group, subgrid);
                    break;
                case DataGroupLayoutType.FLOW:
                    this.computeFlowLayout(group, subgrid);
                    break;
                case DataGroupLayoutType.LEGACY:
                    this.computeLegacyLayout(group, subgrid);
                    break;
                default:
                    throw new Error(`Unknown task layout type '${this.taskContentService.task.layout.type}'`);
            }

            subgrid.finalize();
            result.set(subgrid.subgridId, subgrid);
        });

        this.renderFields(result);
    }

    protected renderFields(subgrids: Map<string, Subgrid>) {
        const subgridsArray = Array.from(subgrids.values());

        if (!this._asyncRenderingConfig.enableAsyncRenderingForNewFields
            && !(this._asyncRenderingConfig.enableAsyncRenderingOnTaskExpand && this.taskContentService.isExpanding)) {
            subgridsArray.forEach(subgrid => {
                subgrid.displayAllFields();
            });
            this.renderContent(subgridsArray);
            return;
        }

        if (!(this.taskContentService.isExpanding && this._asyncRenderingConfig.enableAsyncRenderingOnTaskExpand)) {
            this._dataSource$.value.forEach(oldSubgrid => {
                if (subgrids.has(oldSubgrid.subgridId)) {
                    subgrids.get(oldSubgrid.subgridId).determineKeptFields(oldSubgrid);
                }
            });
        }

        this.renderContent(subgridsArray);
        this.spreadFieldRenderingOverTime(subgridsArray);
    }

    protected spreadFieldRenderingOverTime(subgrids: Array<Subgrid>, iteration = 0) {
        this._asyncRenderTimeout = undefined;
        if (iteration < subgrids.length) {
            this._asyncRenderTimeout = window.setTimeout(() => {
                subgrids[iteration].renderContentOverTime(() => {
                    this.spreadFieldRenderingOverTime(subgrids, iteration + 1);
                }, iteration === 0);
            });
        }
    }

    /**
     * Clones the content of the data groups to prevent unintentional memory accesses to source data.
     * Rearranges the data groups to accommodate taskrefs. Filters out hidden and forbidden fields.
     * @param dataGroups
     * @returns the preprocesses data groups
     */
    protected preprocessDataGroups(dataGroups: Array<DataGroup>): Array<DataGroup> {
        dataGroups = this.cloneAndFilterHidden(dataGroups);

        const result = [];
        for (let i = 0; i < dataGroups.length; i++) {
            const group = dataGroups[i];
            if (!group.fields.some(f => this.isTaskRef(f))) {
                result.push(group);
                continue;
            }
            const split = this.splitDataGroupOnTaskRef(group);
            if (split.startGroup !== undefined) {
                result.push(split.startGroup);
            }

            if (split.taskRef.value.length === 0 || split.endGroup === undefined) {
                if (split.endGroup !== undefined) {
                    dataGroups.splice(i + 1, 0, split.endGroup);
                }
                continue;
            }

            const directChild = dataGroups[i + 1]; // the data group that immediately follows IS ALWAYS a direct child
            let firstNonDescendantIndex = i + 2;
            for (; firstNonDescendantIndex < dataGroups.length; firstNonDescendantIndex++) {
                const nextGroup = dataGroups[firstNonDescendantIndex];
                if (nextGroup.nestingLevel === undefined || nextGroup.nestingLevel < directChild.nestingLevel) {
                    // end of the block of nested data groups
                    break;
                }
                if (nextGroup.nestingLevel === directChild.nestingLevel
                    && (nextGroup.parentTaskRefId !== split.taskRef.stringId
                        || !split.taskRef.value.some(reffedTaskId => reffedTaskId === nextGroup.parentTaskId))) {
                    break;
                }
            }

            dataGroups.splice(firstNonDescendantIndex, 0, split.endGroup);
        }

        return result;
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
            g.fields = g.fields.filter(field => !field.behavior.hidden && !field.behavior.forbidden).map(field => {
                field.resetLocalLayout();
                return field;
            });
            return g;
        });

        return result.filter(group => group.fields.length > 0);
    }

    protected isTaskRef(field: DataField<unknown>): boolean {
        return field instanceof TaskRefField;
    }

    /**
     * Sorts the input data group based on the Y coordinate of the fields and splits it into parts on the first task ref.
     * If some fields appear before the first task ref they are extracted into a new [startGroup]{@link SplitDataGroup#startGroup}.
     * If some fields appear after the first task ref they are extracted into a new [endGroup]{@link SplitDataGroup#endGroup}.
     * @param dataGroup
     * @protected
     */
    protected splitDataGroupOnTaskRef(dataGroup: DataGroup): SplitDataGroup {
        dataGroup.fields.sort((a, b) => a.localLayout.y - b.localLayout.y);
        const taskRefPosition = dataGroup.fields.findIndex(f => this.isTaskRef(f));
        const result: SplitDataGroup = {
            taskRef: dataGroup.fields[taskRefPosition]
        };

        if (taskRefPosition !== 0) {
            result.startGroup = {
                title: dataGroup.title,
                alignment: dataGroup.alignment,
                layout: dataGroup.layout,
                stretch: dataGroup.stretch,
                fields: dataGroup.fields.slice(0, taskRefPosition),
            };
        }

        if (taskRefPosition !== dataGroup.fields.length - 1) {
            result.endGroup = {
                title: undefined,
                alignment: dataGroup.alignment,
                layout: dataGroup.layout,
                stretch: dataGroup.stretch,
                fields: dataGroup.fields.slice(taskRefPosition + 1),
            };
            result.endGroup.fields.forEach(f => {
                f.localLayout.y -= result.taskRef.localLayout.y - 1;
            });
        }

        return result;
    }

    /**
     * Computes the layout data for a single data group with grid layout. The resulting layout is saved into the input objects.
     * @param dataGroup the data group that should be laid out into a grid
     * @param subgrid the object that holds the context of the computed layouting unit
     */
    protected computeGridLayout(dataGroup: DataGroup, subgrid: Subgrid) {
        const localGrid: Array<Array<string>> = [];

        dataGroup.fields.forEach(dataField => {
            if (!dataField.localLayout
                || dataField.localLayout.x === undefined
                || dataField.localLayout.y === undefined
                || !dataField.localLayout.rows
                || !dataField.localLayout.cols) {
                throw new Error(
                    `You cannot use 'grid' layout without specifying the layout of the data fields (field ID: ${dataField.stringId})`);
            }

            while (localGrid.length < dataField.localLayout.y + dataField.localLayout.rows) {
                localGrid.push(this.newGridRow(subgrid.cols));
            }

            const fieldElement = subgrid.addField(dataField, this._fieldConverter.resolveType(dataField));
            this.occupySpace(localGrid, dataField.localLayout.y, dataField.localLayout.x,
                dataField.localLayout.cols, fieldElement.gridAreaId, dataField.localLayout.rows);
        });

        this.collapseGridEmptySpace(localGrid, dataGroup.layout, subgrid);

        localGrid.forEach(localGridRow => subgrid.addRow(localGridRow));
    }

    /**
     * Applies the empty row removal and field compacting rules based on the provided layout configuration.
     *
     * The input grid is modified in place.
     * @param grid the state of the grid that should be modified
     * @param layout configuration of the applied compacting rules
     * @param subgrid the object that holds the context of the computed layouting unit
     */
    protected collapseGridEmptySpace(grid: Array<Array<string>>, layout: DataGroupLayout, subgrid: Subgrid) {
        const hideRows = layout.hideEmptyRows ?? this._defaultHideEmptyRows;

        if (hideRows === DataGroupHideEmptyRows.ALL) {
            this.removeEmptyRows(grid);
        }

        switch (layout.compactDirection ?? this._defaultCompactDirection) {
            case DataGroupCompact.UP:
                this.compactFieldsUp(grid, hideRows, subgrid);
                break;
        }
    }

    /**
     * Moves any element as far UP as it can go. Elements that were originally declared in the same row might end up in different rows.
     * Resulting trailing empty rows are removed.
     *
     * The input grid is modified in place.
     * @param grid the state of the grid that should be modified
     * @param hideRows configuration for empty row removal during the compacting process
     * @param subgrid the object that holds the context of the computed layouting unit
     */
    protected compactFieldsUp(grid: Array<Array<string>>, hideRows: DataGroupHideEmptyRows, subgrid: Subgrid) {
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

                const elementDimensions = this.getElementDimensions(grid, columnIndex, foundElementRowIndex, subgrid);

                if (this.isAreaEmpty(grid, columnIndex, rowIndex, elementDimensions.width, foundElementRowIndex - rowIndex)) {
                    const element = grid[foundElementRowIndex][columnIndex];
                    this.occupySpace(grid, foundElementRowIndex, columnIndex, elementDimensions.width, '', elementDimensions.height, false);
                    this.occupySpace(grid, rowIndex, columnIndex, elementDimensions.width, element, elementDimensions.height, false);

                    if (hideRows !== DataGroupHideEmptyRows.NONE) {
                        // we only check the rows potentially cleared by moving the grid element up
                        this.removeEmptyRows(grid, foundElementRowIndex, foundElementRowIndex + elementDimensions.height);
                    }
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
     * @param subgrid the object that holds the context of the computed layouting unit
     * @returns the width and height of the specified element
     */
    protected getElementDimensions(grid: Array<Array<string>>, x: number, y: number, subgrid: Subgrid): { width: number, height: number } {
        const element = grid[y][x];
        let width = 1;
        while (x + width < subgrid.cols && grid[y][x + width] === element) {
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
     * @param subgrid the object that holds the context of the computed layouting unit
     */
    protected computeFlowLayout(dataGroup: DataGroup, subgrid: Subgrid) {
        this.flowFields(dataGroup, subgrid, 1);
    }

    /**
     * Computes the layout data for a single data group with legacy layout. The resulting layout is saved into the input objects.
     *
     * The legacy layout forces the number of columns to be 4 and logs a warning if this was not the case.
     * @param dataGroup the data group that should be laid out into a grid using the legacy algorithm used in NAE versions < 4.0.0
     * @param subgrid the object that holds the context of the computed layouting unit
     */
    protected computeLegacyLayout(dataGroup: DataGroup, subgrid: Subgrid) {
        if (subgrid.cols !== 4) {
            subgrid.cols = 4;
            this._logger.warn(`Task with id '${this.taskContentService.task.stringId}' has a data group with legacy layout with a `
                + `non-default number of columns. If you want to use a layout with different number of columns than 2 use a different `
                + `layout type instead.`);
        }

        this.flowFields(dataGroup, subgrid, 2);
    }

    /**
     * Lays out the fields from left to right, from top to bottom. If the width is greater than 1 and the block of flowed fields doesn't fit
     * neatly into the columns (if the width of a single field is not a divisor of column count), then the entire block of fields is
     * left aligned. The last row of fields is aligned to the left, center or right based on the data groups property.
     * If the last row cannot be aligned to the exact center it is offset one grid tile to the left.
     * @param dataGroup the data group that should be laid out into a grid
     * @param subgrid the object that holds the context of the computed layouting unit
     * @param fieldWidth the number of grid tiles, that should be occupied by each field
     */
    protected flowFields(dataGroup: DataGroup, subgrid: Subgrid, fieldWidth: number) {
        const fieldsPerRow = Math.floor(subgrid.cols / fieldWidth);
        const maxXPosition = fieldWidth * (fieldsPerRow - 1);

        let xPosition = 0;
        const localGrid: Array<Array<string>> = [];
        dataGroup.fields.forEach((dataField, dataFieldCount) => {
            const fieldElement = subgrid.addField(dataField, this._fieldConverter.resolveType(dataField));
            if (dataGroup.stretch) {
                subgrid.addRow(this.newGridRow(subgrid.cols, fieldElement.gridAreaId));
                return; // continue
            }
            // else
            if (xPosition === 0) {
                localGrid.push(this.newGridRow(subgrid.cols));
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
            this.occupySpace(localGrid, localGrid.length - 1, xPosition, fieldWidth, fieldElement.gridAreaId);

            xPosition += fieldWidth;
            if (xPosition > maxXPosition) {
                xPosition = 0;
            }
        });
        localGrid.forEach(row => subgrid.addRow(row));
    }

    /**
     * @param width width of the row
     * @param content the value that should be used to fill all elements in the row
     */
    protected newGridRow(width: number, content = ''): Array<string> {
        return Array(width).fill(content);
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
     * Destroys the previous content and pushes the new content into the stream
     * @param content the new content
     */
    protected renderContent(content: Array<Subgrid> = []): void {
        this._dataSource$.value.forEach(subgrid => subgrid.destroy());
        this._dataSource$.next(content);
    }

    protected createSubgridId(dataGroup: DataGroup): string {
        let idBase: string;
        if (dataGroup.parentTaskId !== undefined) {
            idBase = [dataGroup.parentTaskId, dataGroup.parentTaskRefId, dataGroup.nestingLevel].join('#');
        } else {
            idBase = 'root';
        }
        let id = idBase;
        while (this._existingSubgridIds.has(id)) {
            id = idBase + this._subgridIdCounter.next();
        }
        this._existingSubgridIds.add(id);
        return id;
    }

    public trackBySubgridFn = (index: number, subgrid: Subgrid) => subgrid.subgridId;

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
                return element.item.stringId + '-' + this.taskContentService.$shouldCreateCounter.getValue();
        }
    }
}
