import {Place} from '@netgrif/petriflow';
import {PetriflowPlace} from '@netgrif/petriflow.svg';
import {CanvasNodeElement} from './canvas-node-element';

export class CanvasPlace extends CanvasNodeElement<Place, PetriflowPlace>{

    constructor(modelPlace: Place, svgPlace: PetriflowPlace) {
        super(modelPlace, svgPlace);
    }

    get modelPlace(): Place {
        return this.modelElement;
    }

    get svgPlace(): PetriflowPlace {
        return this.svgElement;
    }
}
