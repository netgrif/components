import {NodeElement} from '@netgrif/petriflow';
import {PetriflowNode} from '@netgrif/petriflow.svg';
import {PetriflowCanvasElement} from '@netgrif/petriflow.svg/lib/svg-elements/petriflow-canvas-element';
import {CanvasArc} from './canvas-arc';
import {CanvasNodeElement} from './canvas-node-element';
import {CanvasObject} from './canvas-object';
import {CanvasPlace} from './canvas-place';
import {CanvasTransition} from './canvas-transition';

export class CanvasElementCollection {

    private readonly _places: Map<string, CanvasPlace>;
    private readonly _transitions: Map<string, CanvasTransition>;
    private readonly _arcs: Map<string, CanvasArc>;

    constructor() {
        this._places = new Map<string, CanvasPlace>();
        this._transitions = new Map<string, CanvasTransition>();
        this._arcs = new Map<string, CanvasArc>();
    }

    removeAll(): void {
        this._places.clear();
        this._transitions.clear();
        this._arcs.clear()
    }

    get places(): Array<CanvasPlace> {
        return Array.from(this._places.values());
    }

    getPlace(id: string): CanvasPlace {
        return this._places.get(id);
    }

    addPlace(place: CanvasPlace): void {
        this._places.set(place.modelPlace.id, place);
    }

    addPlaces(places: Array<CanvasPlace>): void {
        if (!places) {
            return;
        }
        places.forEach(this.addPlace.bind(this));
    }

    removePlace(id: string): void {
        this._places.delete(id);
    }

    get transitions(): Array<CanvasTransition> {
        return Array.from(this._transitions.values());
    }

    getTransition(id: string): CanvasTransition {
        return this._transitions.get(id);
    }

    addTransition(transition: CanvasTransition): void {
        this._transitions.set(transition.modelTransition.id, transition);
    }

    addTransitions(transitions: Array<CanvasTransition>): void {
        if (!transitions) {
            return;
        }
        transitions.forEach(this.addTransition.bind(this));
    }

    removeTransition(id: string): void {
        this._transitions.delete(id);
    }

    get arcs(): Array<CanvasArc> {
        return Array.from(this._arcs.values());
    }

    getArc(id: string): CanvasArc {
        return this._arcs.get(id);
    }

    addArc(arc: CanvasArc): void {
        this._arcs.set(arc.modelArc.id, arc);
    }

    addArcs(arcs: Array<CanvasArc>): void {
        if (!arcs) {
            return;
        }
        arcs.forEach(this.addArc.bind(this));
    }

    removeArc(id: string): void {
        this._arcs.delete(id);
    }

    replaceAll(elements: CanvasElementCollection): void {
        this.clear();
        this.addPlaces(elements.places);
        this.addTransitions(elements.transitions);
        this.addArcs(elements.arcs);
    }

    clear(): void {
        this._places.clear();
        this._transitions.clear();
        this._arcs.clear();
    }

    getAll(): Array<CanvasObject<any, PetriflowCanvasElement>> {
        return [...this.places, ...this.transitions, ...this.arcs];
    }

    public isEmpty(): boolean {
        return this.places.length + this.transitions.length + this.arcs.length === 0;
    }

    public totalSize(): number {
        return this.places.length + this.transitions.length + this.arcs.length;
    }

    public findNode(id: string): CanvasNodeElement<NodeElement, PetriflowNode<any>> {
        let node: CanvasPlace | CanvasTransition = this._places.get(id);
        if (!node) {
            node = this._transitions.get(id);
        }
        return node;
    }

    public contains(element: CanvasObject<any, any>): boolean {
        const id = element.modelObject.id;
        return this._arcs.has(id) ||
            this._places.has(id) ||
            this._transitions.has(id);
    }
}
