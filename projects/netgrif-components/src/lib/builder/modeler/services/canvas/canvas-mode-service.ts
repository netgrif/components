import {Place as SvgPlace, Transition as SvgTransition} from '@netgrif/petri.svg';
import {Arc, NodeElement, PetriNet, Place, Transition} from '@netgrif/petriflow';
import {
  PetriflowCanvas,
  PetriflowCanvasService,
  PetriflowPlace as PetriflowSvgPlace,
  PetriflowTransition as PetriflowSvgTransition,
} from '@netgrif/petriflow.svg';
import {InjectedTabData} from '@netgrif/components-core';
import {ModeService} from '../../control-panel/modes/mode-component/mode.service';
import {Tool} from '../../control-panel/tools/tool';
import {ArcFactory} from '../../edit-mode/domain/arc-builders/arc-factory.service';
import {CanvasArc} from '../../edit-mode/domain/canvas-arc';
import {CanvasElementCollection} from '../../edit-mode/domain/canvas-element-collection';
import {CanvasPlace} from '../../edit-mode/domain/canvas-place';
import {CanvasTransition} from '../../edit-mode/domain/canvas-transition';
import {ModelService} from '../model/model.service';

export abstract class CanvasModeService<T extends Tool> extends ModeService<T> {
    protected readonly _elements: CanvasElementCollection;
    protected _labelText: (n: NodeElement) => string;
    protected _multiplicityText: (a: CanvasArc) => string;

    protected constructor(
        protected _arcFactory: ArcFactory,
        protected _modelService: ModelService,
        protected _canvasService: PetriflowCanvasService,
        protected _tabData?: InjectedTabData,
    ) {
        super();
        // the tab's content (and this service) stays alive while the tab is open but hidden (see NAE-326);
        // panzoom's initial view is computed from live element dimensions, which are wrong while hidden,
        // so re-sync it once the tab becomes visible again.
        this._tabData?.tabSelected$?.subscribe(selected => {
            if (selected) {
                this.panzoom?.reset({animate: false});
            }
        });
        this.labelText = (n: NodeElement) => n.label.value;
        this.multiplicityText = (a: CanvasArc) => {
            if (!!a.modelArc.reference) {
                return `${a.modelArc.reference} (${this._modelService.getReferenceValue(a.modelArc.reference)})`;
            }
            if (a.modelArc.multiplicity > 1) {
                return `${a.modelArc.multiplicity}`;
            }
            return '';
        };
        this._elements = new CanvasElementCollection();
    }

    public renderModel(model: PetriNet = this.model): void {
        if (model === undefined) {
            return;
        }
        this.reset();
        model.getPlaces().forEach(modelPlace => {
            this.newSvgPlace(modelPlace);
        });
        model.getTransitions().forEach(modelTransition => {
            this.newSvgTransition(modelTransition);
        });
        model.getArcs().forEach(modelArc => {
            this.newSvgArc(modelArc);
        });
    }

    public reset(): void {
        this.canvas?.removeAll();
        this.elements?.removeAll();
    }

    public newSvgTransition(modelTransition: Transition): CanvasTransition {
        const svgTransition = new PetriflowSvgTransition(new SvgTransition(modelTransition.id, this.labelText(modelTransition), new DOMPoint(modelTransition.x, modelTransition.y)), modelTransition.icon);
        const canvasTransition = new CanvasTransition(modelTransition, svgTransition);
        this.elements.addTransition(canvasTransition);
        this.canvas?.addTransition(svgTransition.canvasElement);
        return canvasTransition;
    }

    public newSvgPlace(modelPlace: Place): CanvasPlace {
        const svgPlace = new PetriflowSvgPlace(new SvgPlace(modelPlace.id, this.labelText(modelPlace), modelPlace.marking, new DOMPoint(modelPlace.x, modelPlace.y)));
        const canvasPlace = new CanvasPlace(modelPlace, svgPlace);
        this.elements.addPlace(canvasPlace);
        this.canvas?.addPlace(svgPlace.canvasElement);
        return canvasPlace;
    }

    public newSvgArc(modelArc: Arc<any, any>): CanvasArc {
        const breakpoints = modelArc.breakpoints.map(breakpoint => new DOMPoint(breakpoint.x, breakpoint.y));
        const svgArc = this.arcFactory.buildSvgArc(modelArc.type, modelArc.id, this.elements.findNode(modelArc.source.id).svgElement.canvasElement, this.elements.findNode(modelArc.destination.id).svgElement.canvasElement);
        svgArc.getBreakPointList().push(...breakpoints);
        svgArc.element.updateLine();
        const canvasArc = new CanvasArc(modelArc, svgArc);
        svgArc.setMultiplicity(this.multiplicityText(canvasArc));
        this.elements.addArc(canvasArc);
        this.canvas?.addArc(svgArc.element);
        return canvasArc;
    }

    get elements(): CanvasElementCollection {
        return this._elements;
    }

    get labelText(): (n: NodeElement) => string {
        return this._labelText;
    }

    set labelText(value: (n: NodeElement) => string) {
        this._labelText = value;
    }

    get multiplicityText(): (a: CanvasArc) => string {
        return this._multiplicityText;
    }

    set multiplicityText(value: (a: CanvasArc) => string) {
        this._multiplicityText = value;
    }

    public get canvas(): PetriflowCanvas {
        return this.canvasService.canvas;
    }

    public get panzoom() {
        return this.canvasService.panzoom;
    }

    public get arcFactory(): ArcFactory {
        return this._arcFactory;
    }

    public get modelService(): ModelService {
        return this._modelService;
    }

    public get canvasService(): PetriflowCanvasService {
        return this._canvasService;
    }

    public get model(): PetriNet {
        return this.modelService.model;
    }
}
