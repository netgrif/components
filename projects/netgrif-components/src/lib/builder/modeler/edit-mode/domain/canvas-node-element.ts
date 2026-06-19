import {NodeElement} from '@netgrif/petriflow';
import {PetriflowNode} from '@netgrif/petriflow.svg';
import {CanvasObject} from './canvas-object';

export abstract class CanvasNodeElement<M extends NodeElement, S extends PetriflowNode<any>> extends CanvasObject<M, S> {

    get id(): string {
        return this.modelElement.id;
    }

    get modelElement(): M {
        return this.modelObject;
    }

    get svgElement(): S {
        return this.svgObject;
    }

    getBounds(): DOMRect {
        return this.svgElement.canvasElement.element.getBBox();
    }

    public static pretty(node: NodeElement): string {
        const title = node.label?.value ? `${node.label.value} ` : '';
        const id = `[${node.id}]`;
        return title + id;
    }
}
