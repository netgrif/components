import {DataLayout, DataRef, DataVariable, I18nWithDynamic} from '@netgrif/petriflow';
import {GridsterItem, GridsterItemComponentInterface} from 'angular-gridster2';

export class GridsterDataField implements GridsterItem {
    // properties needed because of GridsterUtils.merge implementation
    initCallback: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void;
    x: number;
    y: number;
    rows: number;
    cols: number;

    private readonly _dataRef: DataRef;
    private readonly _dataVariable: DataVariable;

    constructor(dataRef: DataRef, dataVariable: DataVariable) {
        // TODO: check args?
        this._dataRef = dataRef;
        this.x = dataRef.layout.x;
        this.y = dataRef.layout.y;
        this.rows = dataRef.layout.rows;
        this.cols = dataRef.layout.cols;
        this._dataVariable = dataVariable;
        if (!this._dataRef.layout) {
            this._dataRef.layout = new DataLayout();
        }
        if (!this._dataVariable.init) {
            this._dataVariable.init = new I18nWithDynamic('');
        }
    }

    get dataRef(): DataRef {
        return this._dataRef;
    }

    get dataVariable(): DataVariable {
        return this._dataVariable;
    }
}
