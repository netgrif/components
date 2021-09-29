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

    public getRunningTitleCount(): IncrementingCounter {
        return this._runningTitleCount;
    }

    public addElement(element: DatafieldGridLayoutElement): void {
        this._content.push(element);
    }

    public addField(field: DataField<unknown>, type: FieldTypeResource): DatafieldGridLayoutElement {
        const element = this.fieldElement(field, type);
        this.addElement(element);
        return element;
    }

    public addTitle(dataGroup: DataGroup): DatafieldGridLayoutElement {
        const element = this.groupTitleElement(dataGroup);
        this.addElement(element);
        return element;
    }

    public addRow(row: Array<string>): void {
        this._grid.push(row);
    }

    /**
     * Converts the provided configuration into data that can be fed into css grid layout
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
     * Joins the grid of element into a string accepted by `[gdAreas]` input property of Angular flex layout
     */
    protected createGridAreasString(): void {
        this.gridAreas = this._grid.map(row => row.join(' ')).join(' | ');
    }

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

    public renderContentOverTime(callback: () => void, first: boolean = false) {
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
