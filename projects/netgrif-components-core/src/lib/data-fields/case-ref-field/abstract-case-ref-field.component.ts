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
    InhibitorArc, Place,
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
import {PetriNetImport} from '../../resources/interface/petri-net-import';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'ncc-abstract-case-ref-field',
    template: ''
})
export abstract class AbstractCaseRefFieldComponent implements AfterViewInit {

    @Input() public dataField: CaseRefField;

    constructor(protected _petriflowCanvasService: PetriflowCanvasService, protected _petriflowFactoryService: PetriflowCanvasFactoryService,
                protected _petriflowConfigService: PetriflowCanvasConfigurationService, protected _caseResourceService: CaseResourceService,
                protected _petriNetResourceService: PetriNetResourceService, protected _log: LoggerService, protected _snackBar: SnackBarService,
                protected _translate: TranslateService) {
    }

    ngAfterViewInit(): void {
        this._petriNetResourceService.getNetByCaseId(this.dataField.value).subscribe(net => {
            if (net) {
                this.createNet(net);
            }
        }, error => {
            this._log.error('Getting net by Case ID failed in field ['+ this.dataField.stringId + ']', error);
            this._snackBar.openErrorSnackBar(this._translate.instant('dataField.snackBar.caseNetGetFailed'));
        });
    }

    protected createNet(net: PetriNetImport) {
        const trans: Array<PetriflowTransition> = [];
        const places: Array<PetriflowPlace> = [];
        const arcs: Array<PetriflowArc<any>> = [];
        let minX: number = Number.MAX_SAFE_INTEGER;
        let minY: number = Number.MAX_SAFE_INTEGER;
        net.transitions.forEach((value) => {
            const t = this.createTransitions(value)
            trans.push(t);
            minX = Math.min(minX, value.position.x);
            minY = Math.min(minY, value.position.y);
            this.setPlaceActions(t.canvasElement.element);
        })
        net.places.forEach((value) => {
            const p = this.createPlace(value)
            places.push(p);
            minX = Math.min(minX, value.position.x);
            minY = Math.min(minY, value.position.y);
            this.setPlaceActions(p.canvasElement.element);
            p.canvasElement.markingTokens.forEach(markingToken => {
                this.setPlaceActions(markingToken);
            });
        })
        net.arcs.forEach((arc) => {
            const a = this.createArcs(trans, places, arc, net)
            arcs.push(a);
            arc.breakpoints?.forEach(value => {
                minX = Math.min(minX, value.x);
                minY = Math.min(minY, value.y);
            });
            this.setPlaceActions(a.element.arcLine);
        });
        trans.forEach(value => {
            if (net.assignedTasks.includes(value.canvasElement.label.textContent)) {
                value.select();
            }
            if (this.isEnabled(value, places, arcs)) {
                value.canvasElement.element.classList.add('svg-transition-enabled');
                value.canvasElement.element.setAttributeNS(null, 'fill', 'yellowgreen');
                value.canvasElement.element.setAttributeNS(null, 'stroke', 'green');
            }
        });
        this._petriflowCanvasService.panzoom?.moveTo(-minX + 20, -minY + 20);
        if (this.dataField.component?.properties?.lock === 'true') {
            setTimeout(() => {
                this._petriflowCanvasService.panzoom?.pause();
            })
        }
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

    protected createArcs(trans: Array<PetriflowTransition>, places: Array<PetriflowPlace>, arc: ArcImport, net: PetriNetImport) {
        let source: PetriflowPlace | PetriflowTransition = trans.find(value => value.canvasElement.label.textContent === arc.sourceId);
        let destination: PetriflowPlace | PetriflowTransition;
        let activable: boolean = false;
        if (source === undefined) {
            source = places.find(value => value.canvasElement.label.textContent === arc.sourceId);
            destination = trans.find(value => value.canvasElement.label.textContent === arc.destinationId);
            if (net.assignedTasks.includes(destination.canvasElement.label.textContent)) {
                source.select();
                destination.select();
                activable = true;
            }
        } else {
            destination = places.find(value => value.canvasElement.label.textContent === arc.destinationId);
            if (net.finishedTasks.includes(source.canvasElement.label.textContent)) {
                source.select();
                destination.select();
                activable = true;
            }
        }
        if (source === undefined || destination === undefined) {
            this._log.error("Can't find source or destination for arc [" + arc.importId + "]");
        } else {
            const newArc: Arc = this.createArc(arc, source, destination);
            const petriflowArc: PetriflowArc<Arc> = this.createPetriflowArc(arc, newArc, source);
            if (activable) {
                petriflowArc.select();
            }
            this._petriflowCanvasService.canvas.container.appendChild(newArc.container);
            this._petriflowCanvasService.petriflowElementsCollection.arcs.push(petriflowArc);
            return petriflowArc;
        }
        return undefined
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

    protected isEnabled(t: PetriflowTransition, places: Array<PetriflowPlace>, arcs: Array<PetriflowArc<any>>): boolean {
        const testMarking: Map<string, number> = new Map();

        for (const place of places) {
            testMarking.set(place.canvasElement.id, place.canvasElement.tokensCount);
        }
        for (const arc of arcs) {
            if (arc.element.end.id === t.canvasElement.id && (arc instanceof PetriflowInhibitorArc) && testMarking.get((arc.element.start as Place).id) >= parseInt(arc.element.multiplicity.data, 10)) {
                return false;
            }
        }
        for (const arc of arcs) {
            if (arc.element.end.id === t.canvasElement.id && (arc instanceof PetriflowReadArc) && testMarking.get((arc.element.start as Place).id) < parseInt(arc.element.multiplicity.data, 10)) {
                return false;
            }
        }
        for (const arc of arcs) {
            if (arc.element.end.id === t.canvasElement.id && arc instanceof PetriflowPlaceTransitionArc) {
                const place = testMarking.get((arc.element.start as Place).id)
                testMarking.set((arc.element.start as Place).id, place - parseInt(arc.element.multiplicity.data, 10));
            }
        }
        for (const place of testMarking.values()) {
            if (place < 0) {
                return false;
            }
        }

        return true;
    }

    public getHeight() {
        return (this.dataField.layout && this.dataField.layout.rows && this.dataField.layout.rows) > 1 ?
            this.dataField.layout.rows * CaseRefField.FIELD_HEIGHT : CaseRefField.FIELD_HEIGHT;
    }

    protected setPlaceActions(svgElement: SVGElement) {
        svgElement.onmouseenter = () => {};
        svgElement.onmouseleave = () => {};
    }

}
