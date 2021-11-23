import {DatafieldGridLayoutElement} from './datafield-grid-layout-element';
import {IncrementingCounter} from '../../utility/incrementing-counter';
import {TaskElementType} from './task-content-element-type';
import {DataField} from '../../data-fields/models/abstract-data-field';
import {FieldTypeResource} from './field-type-resource';
import {DataGroup} from '../../resources/interface/data-groups';
import {BehaviorSubject} from 'rxjs';
import {AsyncRenderingConfiguration} from './async-rendering-configuration';

/**
 * A configuration for one subgrid - a basic layouting unit
 */
export class Subgrid {
    /**
     * the css `gridAreas` configuration, that determines the layout of the grids content
     */
    gridAreas: string;
    /**
     * The elements that are contained in the subgrid
     */
    protected _content: Array<DatafieldGridLayoutElement> = [];
    /**
     * The elements that are contained in the subgrid and have already been rendered to the user
     */
    protected _renderedContent$: BehaviorSubject<Array<DatafieldGridLayoutElement>>;
    /**
     * A 2D representation of the grid element IDs
     */
    protected _grid: Array<Array<string>> = [];
    /**
     * Counter to assure element ID uniqueness
     */
    protected _runningTitleCount: IncrementingCounter = new IncrementingCounter();
    /**
     * Grid area identifiers that are already in use
     */
    protected _existingIdentifiers = new Set<string>();
    protected _asyncRenderingTimeout: number;
    protected _keptElements: Array<DatafieldGridLayoutElement>;
    protected _newElements: Array<DatafieldGridLayoutElement>;

    /**
     * @param subgridId a unique identifier of the subgrid in the task layout
     * @param cols Number of columns of the subgrid
     * @param _asyncRenderingConfig configuration object for async rendering of data fields
     */
    public constructor(public subgridId: string, public cols: number, protected _asyncRenderingConfig: AsyncRenderingConfiguration) {
        this._renderedContent$ = new BehaviorSubject<Array<DatafieldGridLayoutElement>>([]);
    }

    get content(): Array<DatafieldGridLayoutElement> {
        return this._renderedContent$.value;
    }

    /**
     * Completes the underlying stream and clears any running timeouts
     */
    public destroy() {
        this._renderedContent$.complete();
        if (this._asyncRenderingTimeout !== undefined) {
            window.clearTimeout(this._asyncRenderingTimeout);
        }
    }

    /**
     * @returns the columns configuration for the grid layout
     */
    public getGridColumns(): string {
        return 'repeat(' + this.cols + ', 1fr)';
    }

    public getRunningTitleCount(): IncrementingCounter {
        return this._runningTitleCount;
    }

    /**
     * Converts a {@link DataField} into a {@link DatafieldGridLayoutElement} and adds it to the content of this subgrid.
     *
     * Beware that this method DOES NOT add the element into the resulting grid. This must be done independently by calling the
     * [addRow]{@link Subgrid#addRow} method.
     * @param field the field that should be added to the subgrid
     * @param type the type of the field
     * @returns the created grid element
     */
    public addField(field: DataField<unknown>, type: FieldTypeResource): DatafieldGridLayoutElement {
        const element = this.fieldElement(field, type);
        this.addElement(element);
        return element;
    }

    /**
     * Converts a {@link DataGroup} into a {@link DatafieldGridLayoutElement} and adds it to the content of this subgrid.
     *
     * Beware that this method DOES NOT add the element into the resulting grid. This must be done independently by calling the
     * [addRow]{@link Subgrid#addRow} method.
     * @param dataGroup the data group whose title should be added to the grid
     * @returns the created grid element
     */
    public addTitle(dataGroup: DataGroup): DatafieldGridLayoutElement {
        const element = this.groupTitleElement(dataGroup);
        this.addElement(element);
        return element;
    }

    protected addElement(element: DatafieldGridLayoutElement): void {
        this._content.push(element);
    }

    /**
     * Adds a row of CSS `gridAreaId`s into the grid that is held in this subgrid.
     * @param row the field Ids. The width of the row should match the number of columns of the grid. If not an error is thrown.
     */
    public addRow(row: Array<string>): void {
        if (row.length !== this.cols) {
            throw new Error(`The provided grid layout row '${JSON.stringify(row)
            }' does not match the number of columns of this subgrid (${this.cols})`);
        }
        this._grid.push(row);
    }

    /**
     * Converts the provided configuration into data that can be fed into CSS grid layout
     */
    public finalize() {
        this.fillEmptySpace();
        this.createGridAreasString();
    }

    /**
     * Fills empty tiles in the grid with blank elements
     */
    protected fillEmptySpace() {
        const runningBlanksCount = new IncrementingCounter();
        this._grid.forEach(row => {
            for (let i = 0; i < row.length; i++) {
                if (row[i] !== '') {
                    continue;
                }
                const filler = this.fillerElement(runningBlanksCount);
                row[i] = filler.gridAreaId;
                this._content.push(filler);
            }
        });
    }

    /**
     * @param field the field whose representation should be created
     * @param type the type of the data field
     * @returns an object that represents the provided data field in the layout
     */
    protected fieldElement(field: DataField<unknown>, type: FieldTypeResource): DatafieldGridLayoutElement {
        return {gridAreaId: this.assureUniqueness(field.stringId), type, item: field};
    }

    /**
     * @param fillerCounter the counter that is used to track the number of already created filler elements
     * @returns a filler element object with a unique ID. The provided counter is incremented by one.
     */
    protected fillerElement(fillerCounter: IncrementingCounter): DatafieldGridLayoutElement {
        return {gridAreaId: this.assureUniqueness('blank' + fillerCounter.next()), type: TaskElementType.BLANK};
    }

    /**
     * @param dataGroup the data group whose title element should be created
     * @returns an object that represents a title element of the provided data group. The provided counter is incremented by one.
     */
    protected groupTitleElement(dataGroup: DataGroup): DatafieldGridLayoutElement {
        return {
            title: dataGroup.title,
            gridAreaId: this.assureUniqueness('group' + this._runningTitleCount.next()),
            type: TaskElementType.DATA_GROUP_TITLE
        };
    }

    /**
     * Assures that the provided identifier will be unique.
     * @param identifier the base for the identifier
     * @returns the base identifier, if it already is unique. A unique variation on the base identifier if it is already in use.
     */
    protected assureUniqueness(identifier: string): string {
        const alphaNumIdentifier = 'x' + identifier.replace(/[^0-9a-z]/gi, '');
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
     * Joins the grid of element into a string accepted by `[gdAreas]` input property of Angular flex layout
     */
    protected createGridAreasString(): void {
        this.gridAreas = this._grid.map(row => row.join(' ')).join(' | ');
    }

    /**
     * Marks all contained elements as kept and displays them.
     */
    public displayAllFields(): void {
        this._keptElements = [...this._content];
        this._newElements = [];
        this._renderedContent$.next(this._keptElements);
    }

    /**
     * Determines which elements from the provided subgrid are contained in this subgrid.
     * Marks these elements as kept and displays them. Marks the remaining elements as new.
     *
     * New elements can be displayed asynchronously over time by calling the
     * [renderContentOverTime]{@link Subgrid#renderContentOverTime} method.
     * @param subgrid the "previous" subgrid that is used to compute the element "difference"
     */
    public determineKeptFields(subgrid: Subgrid): void {
        this._keptElements = [];
        this._newElements = [];

        this._content.forEach(element => {
            if (subgrid.content.some(el => el.gridAreaId === element.gridAreaId)) {
                this._keptElements.push(element);
            } else {
                this._newElements.push(element);
            }
        });

        this._renderedContent$.next(this._keptElements);
    }

    /**
     * If elements are not sorted into new and kept, marks all elements as new.
     * The [determineKeptFields]{@link Subgrid#determineKeptFields} method can be used to mark elements as kept.
     *
     * Then pushes the new elements with the kept elements into the output array over time as specified by the
     * {@link AsyncRenderingConfiguration} provided in the subgrids constructor.
     *
     * @param callback the function that is called once all new elements were pushed into the output array
     * @param first whether this is the first subgrid that si rendered. If this is the first subgrid then on the initial rendering of
     * elements a batch of new fields alongside the loader elements is displayed so that some content is immediately available.
     * Otherwise The initial batch contains only loader elements. Being first effectively shortens the rendering by one batch, since the
     * first loader-only batch is skipped.
     */
    public renderContentOverTime(callback: () => void, first= false) {
        if (this._newElements === undefined) {
            this._newElements = Array.from(this._content);
            this._keptElements = [];
        }
        this.spreadFieldRenderingOverTime(callback, first ? 1 : 0);
    }

    protected spreadFieldRenderingOverTime(callback: () => void, iteration = 0) {
        this._asyncRenderingTimeout = undefined;
        const fieldsInCurrentIteration = this._newElements.slice(0, iteration * this._asyncRenderingConfig.batchSize);
        const placeholdersInCurrentIteration = this._newElements.slice(iteration * this._asyncRenderingConfig.batchSize,
            iteration * this._asyncRenderingConfig.batchSize + this._asyncRenderingConfig.numberOfPlaceholders);

        fieldsInCurrentIteration.push(
            ...placeholdersInCurrentIteration.map(field => ({gridAreaId: field.gridAreaId, type: TaskElementType.LOADER})));

        this._renderedContent$.next([...this._keptElements, ...fieldsInCurrentIteration]);
        if (this._asyncRenderingConfig.batchSize * iteration < this._newElements.length) {
            this._asyncRenderingTimeout = window.setTimeout(() => {
                this.spreadFieldRenderingOverTime(callback, iteration + 1);
            }, this._asyncRenderingConfig.batchDelay);
        } else {
            callback();
        }
    }
}
