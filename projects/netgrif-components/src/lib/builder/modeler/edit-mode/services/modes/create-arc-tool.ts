import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {NodeElement as SvgNodeElement} from '@netgrif/petri.svg';
import {ArcType, NodeElement} from '@netgrif/petriflow';
import {PetriflowNode} from '@netgrif/petriflow.svg';
import {ActionsMasterDetailService} from '../../../actions-mode/actions-master-detail.service';
import {ActionsModeService} from '../../../actions-mode/actions-mode.service';
import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {SelectedTransitionService} from '../../../selected-transition.service';
import {ModelService} from '../../../services/model/model.service';
import {CanvasArc} from '../../domain/canvas-arc';
import {CanvasNodeElement} from '../../domain/canvas-node-element';
import {CanvasPlace} from '../../domain/canvas-place';
import {CanvasTransition} from '../../domain/canvas-transition';
import {EditModeService} from '../../edit-mode.service';
import {CanvasTool} from './canvas-tool';
import {BuilderModeService} from "../../../../builder-mode.service";

export abstract class CreateArcTool<T extends CanvasNodeElement<NodeElement, PetriflowNode<SvgNodeElement>>> extends CanvasTool {

    private _source: T;
    private _arcLine: SVGElement;

    constructor(_id: string, button: ControlPanelButton, modelService: ModelService, dialog: MatDialog,
                editModeService: EditModeService, router: Router, transitionService: SelectedTransitionService,
                actionMode: ActionsModeService, actionsMasterDetail: ActionsMasterDetailService, builderModeService: BuilderModeService) {
        super(_id, button, modelService, dialog, editModeService, router, transitionService, actionMode, actionsMasterDetail, builderModeService);
    }

    abstract startDrawingArc(node: CanvasPlace | CanvasTransition): void;

    abstract finishDrawingArc(createArcFunction: () => CanvasArc): void;

    isWorkInProgress(): boolean {
        return this.arcLine !== undefined;
    }

    onMouseUp(event: PointerEvent) {
        super.onMouseUp(event);
        if (this.isRightButtonClick(event) && this.isWorkInProgress()) {
            this.reset();
            return;
        }
    }

    onMouseMove(event: PointerEvent) {
        super.onMouseMove(event);
        if (this.isWorkInProgress()) {
            this.editModeService.moveTemporaryArc(this.arcLine, this.mousePosition(event), this.source.svgElement);
        }
    }

    onPlaceMove(event: PointerEvent, place: CanvasPlace) {
        super.onPlaceMove(event, place);
        if (this.isWorkInProgress()) {
            this.editModeService.moveTemporaryArc(this.arcLine, this.mousePosition(event), this.source.svgElement);
        }
    }

    onTransitionMove(event: PointerEvent, transition: CanvasTransition) {
        super.onTransitionMove(event, transition);
        if (this.isWorkInProgress()) {
            this.editModeService.moveTemporaryArc(this.arcLine, this.mousePosition(event), this.source.svgElement);
        }
    }

    onArcMove(event: PointerEvent, arc: CanvasArc) {
        super.onArcMove(event, arc);
        if (this.isWorkInProgress()) {
            this.editModeService.moveTemporaryArc(this.arcLine, this.mousePosition(event), this.source.svgElement);
        }
    }

    createArc(type: ArcType, source: CanvasNodeElement<any, any>, destination: CanvasNodeElement<any, any>): CanvasArc {
        const modelArc = this.modelService.newArc(source.modelElement, destination.modelElement, type);
        const svgArc = this.editModeService.newSvgArc(modelArc);
        this.historyService.save(`New ${this.modelService.toXmlArcType(modelArc.type)} arc ${modelArc.id} has been created`);
        return svgArc;
    }

    unbind() {
        super.unbind();
        this.reset();
    }

    reset(): void {
        if (this.arcLine) {
            this.canvas.container.removeChild(this.arcLine);
        }
        this.arcLine = undefined;
        this.source = undefined;
    }

    get source(): T {
        return this._source;
    }

    set source(value: T) {
        this._source = value;
    }

    get arcLine(): SVGElement {
        return this._arcLine;
    }

    set arcLine(value: SVGElement) {
        this._arcLine = value;
    }
}
