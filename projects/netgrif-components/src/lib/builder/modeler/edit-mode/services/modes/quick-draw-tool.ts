import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {
  NodeElement as SvgNodeElement,
  RegularPlaceTransitionArc as SvgRegularPlaceTransitionArc,
  RegularTransitionPlaceArc as SvgRegularTransitionPlaceArc,
} from '@netgrif/petri.svg';
import {NodeElement} from '@netgrif/petriflow';
import {PetriflowNode} from '@netgrif/petriflow.svg';
import {ActionsMasterDetailService} from '../../../actions-mode/actions-master-detail.setvice';
import {ActionsModeService} from '../../../actions-mode/actions-mode.service';
import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {SelectedTransitionService} from '../../../selected-transition.service';
import {ModelService} from '../../../services/model/model.service';
import {CanvasArc} from '../../domain/canvas-arc';
import {CanvasNodeElement} from '../../domain/canvas-node-element';
import {CanvasPlace} from '../../domain/canvas-place';
import {CanvasTransition} from '../../domain/canvas-transition';
import {EditModeService} from '../../edit-mode.service';
import {CanvasTool} from './canvas-tool';
import {BuilderModeService} from "../../../../builder-mode.service";

enum Step {
    PLACE,
    TRANSITION,
}

export class QuickDrawTool extends CanvasTool {

    public static readonly ID = 'QuickDrawTool';

    // TODO: NAB-326 remove step,determine based on source and arcline
    private _step: Step;
    private source: CanvasNodeElement<NodeElement, PetriflowNode<SvgNodeElement>>;
    private arcLine: SVGElement;

    constructor(
        modelService: ModelService,
        dialog: MatDialog,
        editModeService: EditModeService,
        router: Router,
        transitionService: SelectedTransitionService,
        actionMode: ActionsModeService,
        actionsMasterDetail: ActionsMasterDetailService,
        builderModeService: BuilderModeService
    ) {
        super(
            QuickDrawTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('bolt'),
                'Fast PN',
            ),
            modelService,
            dialog,
            editModeService,
            router,
            transitionService,
            actionMode,
            actionsMasterDetail,
            builderModeService
        );
    }

    isWorkInProgress(): boolean {
        return this.arcLine !== undefined;
    }

    bind() {
        super.bind();
        this.step = Step.PLACE;
    }

    unbind() {
        super.unbind();
        this.editModeService.elements.places.forEach(p => p.svgPlace.deactivate());
        this.editModeService.elements.transitions.forEach(t => t.svgTransition.deactivate());
    }

    onMouseUp(event: PointerEvent): void {
        super.onMouseUp(event);
        if (this.isRightButtonClick(event) && this.isWorkInProgress()) {
            this.reset();
            return;
        }
        if (this.isLeftButtonClick(event)) {
            if (this.step === Step.PLACE) {
                const canvasPlace = this.editModeService.createPlace(this.mousePosition(event));
                this.historyService.save(`Place ${canvasPlace.id} has been created.`);
                this.bindPlace(canvasPlace);
                this.onPlaceUp(event, canvasPlace);
            } else if (this.step === Step.TRANSITION) {
                const canvasTransition = this.editModeService.createTransition(this.mousePosition(event));
                this.historyService.save(`Task ${canvasTransition.id} has been created.`);
                this.bindTransition(canvasTransition);
                this.onTransitionUp(event, canvasTransition);
            }
        }
    }

    onMouseMove(event: PointerEvent): void {
        super.onMouseMove(event);
        this.onMove(event);
    }

    onPlaceUp(event: PointerEvent, canvasPlace: CanvasPlace) {
        super.onPlaceUp(event, canvasPlace);
        if (this.isRightButtonClick(event) && this.isWorkInProgress()) {
            this.reset();
            return;
        }
        if (this.isLeftButtonClick(event) && this.step === Step.PLACE) {
            if (this.source) {
                const canvasArc = this.editModeService.createNewRegularTransitionPlaceArc(this.source as CanvasTransition, canvasPlace);
                this.editModeService.removeTemporaryArc(this.arcLine);
                this.historyService.save(`New ${this.modelService.toXmlArcType(canvasArc.modelArc.type)} arc ${canvasArc.id} has been created`);
                this.bindArc(canvasArc);
            }
            this.source = canvasPlace;
            this.arcLine = this.editModeService.createTemporaryArc(canvasPlace.svgPlace.getPosition(), this.getMarkerId());
            this.nextStep();
        }
    }

    onPlaceMove(event: PointerEvent, place: CanvasPlace) {
        super.onPlaceMove(event, place);
        this.onMove(event);
    }

    onTransitionUp(event: PointerEvent, canvasTransition: CanvasTransition) {
        super.onTransitionUp(event, canvasTransition);
        if (this.isRightButtonClick(event) && this.isWorkInProgress()) {
            this.reset();
            return;
        }
        if (this.isLeftButtonClick(event)) {
            if (this.step === Step.PLACE && this.source) {
                return;
            }
            if (this.step === Step.TRANSITION && this.source) {
                const canvasArc = this.editModeService.createNewRegularPlaceTransitionArc(this.source as CanvasPlace, canvasTransition);
                this.historyService.save(`New ${this.modelService.toXmlArcType(canvasArc.modelArc.type)} arc ${canvasArc.id} has been created`);
                this.editModeService.removeTemporaryArc(this.arcLine);
                this.bindArc(canvasArc);
            }
            this.source = canvasTransition;
            this.arcLine = this.editModeService.createTemporaryArc(canvasTransition.svgTransition.getPosition(), this.getMarkerId());
            this.step = Step.PLACE;
        }
    }

    onTransitionMove(event: PointerEvent, transition: CanvasTransition) {
        super.onTransitionMove(event, transition);
        this.onMove(event);
    }

    onMove(event: PointerEvent): void {
        if (!this.arcLine) {
            return;
        }
        this.editModeService.moveTemporaryArc(this.arcLine, this.mousePosition(event), this.source.svgElement);
    }

    onArcUp(event: PointerEvent, arc: CanvasArc) {
        super.onArcUp(event, arc);
        if (this.isRightButtonClick(event) && this.isWorkInProgress()) {
            this.reset();
            return;
        }
    }

    onArcEnter(event: PointerEvent, arc: CanvasArc) {
        if (this.isWorkInProgress()) {
            return;
        }
        super.onArcEnter(event, arc);
    }

    onArcLeave(event: PointerEvent, arc: CanvasArc) {
        if (this.isWorkInProgress()) {
            return;
        }
        super.onArcLeave(event, arc);
    }

    onArcMove(event: PointerEvent, arc: CanvasArc) {
        super.onArcMove(event, arc);
        this.onMove(event);
    }

    getMarkerId(): string {
        return this.step === Step.PLACE ? SvgRegularPlaceTransitionArc.ID : SvgRegularTransitionPlaceArc.ID;
    }

    reset(): void {
        if (this.arcLine) {
            this.canvas.container.removeChild(this.arcLine);
        }
        this.arcLine = undefined;
        this.source = undefined;
        this.step = Step.PLACE;
        this.editModeService.elements.places.forEach(p => p.svgPlace.deactivate());
        this.editModeService.elements.transitions.forEach(t => t.svgTransition.deactivate());
    }

    set step(value: Step) {
        this._step = value;
        if (this.step === Step.PLACE) {
            this.editModeService.elements.places.forEach(p => p.svgPlace.activate());
            this.editModeService.elements.transitions.forEach(t => t.svgTransition.deactivate());
        } else {
            this.editModeService.elements.places.forEach(p => p.svgPlace.deactivate());
            this.editModeService.elements.transitions.forEach(t => t.svgTransition.activate());
        }
    }

    get step(): Step {
        return this._step;
    }

    private nextStep(): void {
        this.step = this.step === Step.PLACE ? Step.TRANSITION : Step.PLACE;
    }
}
