import {PetriflowCanvasElement} from '@netgrif/petriflow.svg/lib/svg-elements/petriflow-canvas-element';

export abstract class CanvasObject<M, S extends PetriflowCanvasElement> {

    private _modelObject: M;
    private _svgObject: S;

    constructor(modelObject: M, svgObject: S) {
        this._modelObject = modelObject;
        this._svgObject = svgObject;
    }

    public abstract getBounds(): DOMRect;

    public isWithin(rectangle: DOMRect): boolean {
        const box = this.getBounds();
        return (box.x + box.width) < (rectangle.x + rectangle.width)
            && (box.x) > (rectangle.x)
            && (box.y) > (rectangle.y)
            && (box.y + box.height) < (rectangle.y + rectangle.height);
    }

    abstract get id(): string;

    get modelObject(): M {
        return this._modelObject;
    }

    set modelObject(value: M) {
        this._modelObject = value;
    }

    get svgObject(): S {
        return this._svgObject;
    }

    set svgObject(value: S) {
        this._svgObject = value;
    }
}
