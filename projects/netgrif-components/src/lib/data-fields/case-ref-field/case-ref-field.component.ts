import {AfterViewInit, Component, Input} from '@angular/core';
import {CaseRefField, CaseResourceService, PetriNetResourceService, ArcImport} from '@netgrif/components-core';
import {
    PetriflowArc,
    PetriflowCanvasConfigurationService,
    PetriflowCanvasFactoryService,
    PetriflowCanvasService,
    PetriflowInhibitorArc,
    PetriflowPlace,
    PetriflowPlaceTransitionArc, PetriflowReadArc,
    PetriflowResetArc,
    PetriflowTransition,
    PetriflowTransitionPlaceArc
} from '@netgrif/petriflow.svg';
import {
    Arc, InhibitorArc, ReadArc, RegularPlaceTransitionArc,
    RegularTransitionPlaceArc, ResetArc
} from '@netgrif/petri.svg';

@Component({
  selector: 'nc-case-ref-field',
  templateUrl: './case-ref-field.component.html',
  styleUrls: ['./case-ref-field.component.scss']
})
export class CaseRefFieldComponent implements AfterViewInit{

    @Input() public dataField: CaseRefField;

    constructor(private _petriflowCanvasService: PetriflowCanvasService, private _petriflowFactoryService: PetriflowCanvasFactoryService,
                private _petriflowConfigService: PetriflowCanvasConfigurationService, private _caseResourceService: CaseResourceService,
                private _petriNetResourceService: PetriNetResourceService){
    }

    ngAfterViewInit(): void {
        this._petriNetResourceService.getNetByCaseId(this.dataField.value).subscribe(net => {
            if (net) {
                const trans: Array<PetriflowTransition> = [];
                const places: Array<PetriflowPlace> = [];
                let minX: number = 1000;
                let minY: number = 1000;
                net.transitions.forEach((value) => {
                    const transition = this._petriflowFactoryService.createTransition(new DOMPoint(value.position.x, value.position.y));
                    transition.changeId(value.stringId);
                    minX = Math.min(minX, value.position.x);
                    minY = Math.min(minY, value.position.y);
                    this._petriflowConfigService.addTransitionEvents(transition);
                    trans.push(transition);
                })
                net.places.forEach((value) => {
                    const place = this._petriflowFactoryService.createPlace(value.tokens, new DOMPoint(value.position.x, value.position.y));
                    place.changeId(value.stringId);
                    minX = Math.min(minX, value.position.x);
                    minY = Math.min(minY, value.position.y);
                    this._petriflowConfigService.addPlaceEvents(place);
                    places.push(place);
                })
                net.arcs.forEach((arc) => {
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
                        arc.breakpoints?.forEach(value => {
                            minX = Math.min(minX, value.x);
                            minY = Math.min(minY, value.y);
                        });
                    }
                });
                this._petriflowCanvasService.panzoom?.moveTo(-minX+20, -minY+20);
                setTimeout(() => {
                    this._petriflowCanvasService.panzoom?.pause();
                })
            }
        });
    }

    private createArc(arc: ArcImport, source: PetriflowTransition | PetriflowPlace, destination: PetriflowPlace | PetriflowTransition) {
        if (source instanceof PetriflowPlace) {
            switch (arc.type) {
                case 'arc': {
                    return this._petriflowFactoryService.createArc(RegularPlaceTransitionArc, source.canvasElement, destination.canvasElement, arc.breakpoints, arc.multiplicity);
                }
                case 'reset': {
                    return this._petriflowFactoryService.createArc(ResetArc, source.canvasElement, destination.canvasElement, arc.breakpoints, arc.multiplicity);
                }
                case 'inhibitor': {
                    return this._petriflowFactoryService.createArc(InhibitorArc, source.canvasElement, destination.canvasElement, arc.breakpoints, arc.multiplicity);
                }
                case 'read': {
                    return this._petriflowFactoryService.createArc(ReadArc, source.canvasElement, destination.canvasElement, arc.breakpoints, arc.multiplicity);
                }
                default: {
                    return undefined;
                }
            }
        } else if (arc.type === 'arc') {
            return this._petriflowFactoryService.createArc(RegularTransitionPlaceArc, source.canvasElement, destination.canvasElement, arc.breakpoints, arc.multiplicity);
        } else {
            return undefined;
        }
    }

    private createPetriflowArc(arc: ArcImport, newArc: Arc, source: PetriflowTransition | PetriflowPlace) {
        if (source instanceof PetriflowPlace) {
            switch (arc.type) {
                case 'arc': {
                    return this._petriflowFactoryService.createArc(PetriflowPlaceTransitionArc, newArc);
                }
                case 'reset': {
                    return this._petriflowFactoryService.createArc(PetriflowResetArc, newArc);
                }
                case 'inhibitor': {
                    return this._petriflowFactoryService.createArc(PetriflowInhibitorArc, newArc);
                }
                case 'read': {
                    return this._petriflowFactoryService.createArc(PetriflowReadArc, newArc);
                }
                default: {
                    return undefined;
                }
            }
        } else if (arc.type === 'arc') {
            return this._petriflowFactoryService.createArc(PetriflowTransitionPlaceArc, newArc);
        } else {
            return undefined;
        }
    }
}
