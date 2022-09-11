import {AfterViewInit, Component, Input} from '@angular/core';
import {
    PetriflowArc,
    PetriflowCanvasConfigurationService,
    PetriflowCanvasFactoryService,
    PetriflowCanvasService,
    PetriflowInhibitorArc,
    PetriflowPlace,
    PetriflowPlaceTransitionArc, PetriflowReadArc,
    PetriflowResetArc,
    PetriflowTransition, PetriflowTransitionPlaceArc
} from '@netgrif/petriflow.svg';
import {
    Arc,
    InhibitorArc,
    ReadArc,
    RegularPlaceTransitionArc,
    RegularTransitionPlaceArc,
    ResetArc
} from '@netgrif/petri.svg';
import {CaseRefField} from './models/case-ref-field';
import {PetriNetResourceService} from '../../resources/engine-endpoint/petri-net-resource.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {TransitionImport} from '../../resources/interface/transition-import';
import {PlaceImport} from '../../resources/interface/place-import';
import {ArcImport} from '../../resources/interface/arc-import';
import {ArcType} from '../../resources/interface/arc-type';

@Component({
    selector: 'ncc-abstract-case-ref-field',
    template: ''
})
export abstract class AbstractCaseRefFieldComponent implements AfterViewInit {

    @Input() public dataField: CaseRefField;

    constructor(protected _petriflowCanvasService: PetriflowCanvasService, protected _petriflowFactoryService: PetriflowCanvasFactoryService,
                protected _petriflowConfigService: PetriflowCanvasConfigurationService, protected _caseResourceService: CaseResourceService,
                protected _petriNetResourceService: PetriNetResourceService){
    }

    ngAfterViewInit(): void {
        this._petriNetResourceService.getNetByCaseId(this.dataField.value).subscribe(net => {
            if (net) {
                const trans: Array<PetriflowTransition> = [];
                const places: Array<PetriflowPlace> = [];
                let minX: number = Number.MAX_SAFE_INTEGER;
                let minY: number = Number.MAX_SAFE_INTEGER;
                net.transitions.forEach((value) => {
                    trans.push(this.createTransitions(value));
                    minX = Math.min(minX, value.position.x);
                    minY = Math.min(minY, value.position.y);
                })
                net.places.forEach((value) => {
                    places.push(this.createPlace(value));
                    minX = Math.min(minX, value.position.x);
                    minY = Math.min(minY, value.position.y);
                })
                net.arcs.forEach((arc) => {
                    this.createArcs(trans, places, arc);
                    arc.breakpoints?.forEach(value => {
                        minX = Math.min(minX, value.x);
                        minY = Math.min(minY, value.y);
                    });
                });
                this._petriflowCanvasService.panzoom?.moveTo(-minX+20, -minY+20);
                setTimeout(() => {
                    this._petriflowCanvasService.panzoom?.pause();
                })
            }
        });
    }

    protected createTransitions(value: TransitionImport): PetriflowTransition {
        const transition = this._petriflowFactoryService.createTransition(new DOMPoint(value.position.x, value.position.y));
        transition.changeId(value.stringId);
        this._petriflowConfigService.addTransitionEvents(transition);
        return transition;
    }

    protected createPlace(value: PlaceImport): PetriflowPlace {
        const place = this._petriflowFactoryService.createPlace(value.tokens, new DOMPoint(value.position.x, value.position.y));
        place.changeId(value.stringId);
        this._petriflowConfigService.addPlaceEvents(place);
        return place;
    }

    protected createArcs(trans: Array<PetriflowTransition>, places: Array<PetriflowPlace>, arc: ArcImport) {
        let source: PetriflowPlace | PetriflowTransition = trans.find(value => value.canvasElement.label.textContent === arc.sourceId);
        let destination: PetriflowPlace | PetriflowTransition;
        if (source === undefined) {
            source = places.find(value => value.canvasElement.label.textContent === arc.sourceId);
            destination = trans.find(value => value.canvasElement.label.textContent === arc.destinationId);
        } else {
            destination = places.find(value => value.canvasElement.label.textContent === arc.destinationId);
        }
        if (source === undefined || destination === undefined) {
            console.error("Can't find source or destination for arc [" + arc.importId + "]");
        } else {
            const newArc: Arc = this.createArc(arc, source, destination);
            const petriflowArc: PetriflowArc<Arc> = this.createPetriflowArc(arc, newArc, source);
            this._petriflowCanvasService.canvas.container.appendChild(newArc.container);
            this._petriflowCanvasService.petriflowElementsCollection.arcs.push(petriflowArc);
        }
    }

    protected createArc(arc: ArcImport, source: PetriflowTransition | PetriflowPlace, destination: PetriflowPlace | PetriflowTransition) {
        if (source instanceof PetriflowPlace) {
            switch (arc.type) {
                case ArcType.ARC: {
                    return this._petriflowFactoryService.createArc(RegularPlaceTransitionArc, source.canvasElement, destination.canvasElement, arc.breakpoints, arc.multiplicity);
                }
                case ArcType.RESET: {
                    return this._petriflowFactoryService.createArc(ResetArc, source.canvasElement, destination.canvasElement, arc.breakpoints, arc.multiplicity);
                }
                case ArcType.INHIBITOR: {
                    return this._petriflowFactoryService.createArc(InhibitorArc, source.canvasElement, destination.canvasElement, arc.breakpoints, arc.multiplicity);
                }
                case ArcType.READ: {
                    return this._petriflowFactoryService.createArc(ReadArc, source.canvasElement, destination.canvasElement, arc.breakpoints, arc.multiplicity);
                }
                default: {
                    return undefined;
                }
            }
        } else if (arc.type === ArcType.ARC) {
            return this._petriflowFactoryService.createArc(RegularTransitionPlaceArc, source.canvasElement, destination.canvasElement, arc.breakpoints, arc.multiplicity);
        } else {
            return undefined;
        }
    }

    protected createPetriflowArc(arc: ArcImport, newArc: Arc, source: PetriflowTransition | PetriflowPlace) {
        if (source instanceof PetriflowPlace) {
            switch (arc.type) {
                case ArcType.ARC: {
                    return this._petriflowFactoryService.createArc(PetriflowPlaceTransitionArc, newArc);
                }
                case ArcType.RESET: {
                    return this._petriflowFactoryService.createArc(PetriflowResetArc, newArc);
                }
                case ArcType.INHIBITOR: {
                    return this._petriflowFactoryService.createArc(PetriflowInhibitorArc, newArc);
                }
                case ArcType.READ: {
                    return this._petriflowFactoryService.createArc(PetriflowReadArc, newArc);
                }
                default: {
                    return undefined;
                }
            }
        } else if (arc.type === ArcType.ARC) {
            return this._petriflowFactoryService.createArc(PetriflowTransitionPlaceArc, newArc);
        } else {
            return undefined;
        }
    }
}
