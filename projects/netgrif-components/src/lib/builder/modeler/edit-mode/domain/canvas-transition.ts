import {Transition} from '@netgrif/petriflow';
import {PetriflowTransition} from '@netgrif/petriflow.svg';
import {CanvasNodeElement} from './canvas-node-element';

export class CanvasTransition extends CanvasNodeElement<Transition, PetriflowTransition> {

    get modelTransition(): Transition {
        return this.modelElement;
    }

    get svgTransition(): PetriflowTransition {
        return this.svgElement;
    }

    hasForm(): boolean {
        return this.modelTransition.dataGroups?.length > 0 && this.modelTransition.dataGroups.some(dg => dg.getDataRefs()?.length > 0);
    }
}
