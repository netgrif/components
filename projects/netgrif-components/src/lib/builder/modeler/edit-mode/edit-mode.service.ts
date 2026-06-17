import {Injectable, Injector} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {CanvasConfiguration} from '@netgrif/petri.svg';
import {Arc, ArcType, NodeElement, Place, Transition} from '@netgrif/petriflow';
import {PetriflowCanvasService, PetriflowNode} from '@netgrif/petriflow.svg';
import {PanzoomOptions} from '@panzoom/panzoom';
import {BehaviorSubject} from 'rxjs';
import {ChangedArc} from '../../dialogs/dialog-arc-edit/changed-arc';
import {ChangedTransition} from '../../dialogs/dialog-transition-edit/changed-transition';
import {TutorialService} from '../../tutorial/tutorial-service';
import {ActionsMasterDetailService} from '../actions-mode/actions-master-detail.service';
import {ActionsModeService} from '../actions-mode/actions-mode.service';
import {ControlPanelButton} from '../control-panel/control-panel-button';
import {ControlPanelIcon} from '../control-panel/control-panel-icon';
import {Mode} from '../control-panel/modes/mode';
import {ToolGroup} from '../control-panel/tools/tool-group';
import {PlaceChange} from '../history-mode/model/place/place-change';
import {ModelerConfig} from '../modeler-config';
import {SelectedTransitionService} from '../selected-transition.service';
import {CanvasModeService} from '../services/canvas/canvas-mode-service';
import {HistoryService} from '../services/history/history.service';
import {ModelService} from '../services/model/model.service';
import {ContextMenu} from './context-menu/context-menu';
import {ArcFactory} from './domain/arc-builders/arc-factory.service';
import {CanvasArc} from './domain/canvas-arc';
import {CanvasPlace} from './domain/canvas-place';
import {CanvasTransition} from './domain/canvas-transition';
import {AddTokenTool} from './services/modes/add-token-tool';
import {CanvasTool} from './services/modes/canvas-tool';
import {ClearModelTool} from './services/modes/clear-model-tool';
import {CreateInhibitorArcTool} from './services/modes/create-inhibitor-arc-tools';
import {CreatePlaceTool} from './services/modes/create-place-tool';
import {CreateReadArcTool} from './services/modes/create-read-arc-tool';
import {CreateRegularArcTool} from './services/modes/create-regular-arc-tool';
import {CreateResetArcTool} from './services/modes/create-reset-arc-tool';
import {CreateTransitionTool} from './services/modes/create-transition-tool';
import {GridTool} from './services/modes/grid-tool';
import {QuickDrawTool} from './services/modes/quick-draw-tool';
import {RemoveTokenTool} from './services/modes/remove-token-tool';
import {ResetPositionAndZoomTool} from './services/modes/reset-position-and-zoom-tool';
import {SelectTool} from './services/modes/select-tool';
import {SwitchLabelTool} from './services/modes/switch-label-tool';
import {BuilderModeService} from '../../builder-mode.service';
import {CanvasToolContext} from './services/modes/canvas-tool-context';
import {ProcessActionsTool} from "../actions-mode/tools/process-actions-tool";

@Injectable()
export class EditModeService extends CanvasModeService<CanvasTool> {

    public contextMenuItems: BehaviorSubject<ContextMenu>;
    // TODO: NAB-326 refactor
    public switchTools: ToolGroup<CanvasTool>;
    public panzoomConfiguration: PanzoomOptions = {
        canvas: true,
        contain: 'outside',
        cursor: 'auto',
        maxScale: 10,
        minScale: 0.5,
        step: 0.2,
        noBind: true
    };

    constructor(
        _arcFactory: ArcFactory,
        modelService: ModelService,
        _canvasService: PetriflowCanvasService,
        dialog: MatDialog,
        router: Router,
        transitionService: SelectedTransitionService,
        _builderModeService: BuilderModeService,
        private _tutorialService: TutorialService,
        private _parentInjector: Injector,
        private _historyService: HistoryService,
        protected _actionMode: ActionsModeService,
        protected _actionsMasterDetail: ActionsMasterDetailService,
        protected _processActionsTool: ProcessActionsTool
    ) {
        super(_arcFactory, modelService, _canvasService);
        this.mode = new Mode(
            'modeler',
            new ControlPanelButton(
                new ControlPanelIcon('mode_edit_outline'),
                'Edit view'
            ),
            './',
            '/modeler',
            this._tutorialService.modeler,
            this._parentInjector
        );
        const context = new CanvasToolContext(modelService, dialog, this, router, transitionService, _actionMode, _actionsMasterDetail, _builderModeService, _processActionsTool);
        this.switchTools = new ToolGroup<CanvasTool>(
            new ClearModelTool(context),
            new ResetPositionAndZoomTool(context),
            new GridTool(context),
            new SwitchLabelTool(context)
        );
        this.tools = [
            new ToolGroup<CanvasTool>(
                new SelectTool(context),
                new QuickDrawTool(context),
                new CreateTransitionTool(context),
                new CreatePlaceTool(context),
                new AddTokenTool(context),
                new RemoveTokenTool(context)
            ),
            new ToolGroup<CanvasTool>(
                new CreateRegularArcTool(context),
                new CreateResetArcTool(context),
                new CreateInhibitorArcTool(context),
                new CreateReadArcTool(context)
            ),
            this.switchTools
        ];
        this.modelService.model$().subscribe(_ => this.renderModel());
        this.modelService.placeChange.subscribe(value => this.updatePlace(value));
        this.modelService.transitionChange.subscribe(value => this.updateTransition(value));
        this.modelService.arcChange.subscribe(arc => this.updateArc(arc));
        this.canvasService.gridConfiguration.size = ModelerConfig.SIZE;
        CanvasConfiguration.SIZE = ModelerConfig.SIZE;
        this.contextMenuItems = new BehaviorSubject<ContextMenu>(undefined);
        this.switchTools.tools.forEach(t => t.bind());
    }

    activate(tool?: CanvasTool) {
        if (tool === undefined) {
            tool = this.defaultTool;
        }
        if (this.switchTools.tools.includes(tool)) {
            return;
        }
        this.activeTool?.unbind();
        super.activate(tool);
        this.activeTool.bind();
    }

    public renderModel(): void {
        super.renderModel();
        this.activate();
    }

    // PLACE

    createPlace(position: DOMPoint): CanvasPlace {
        const modelPlace = this.modelService.newPlace(position.x, position.y);
        return this.newSvgPlace(modelPlace);
    }

    copyPlace(copy: CanvasPlace): CanvasPlace {
        const modelPlace = this.modelService.copyPlace(copy.modelPlace);
        return this.newSvgPlace(modelPlace);
    }

    public newSvgPlace(modelPlace: Place): CanvasPlace {
        const canvasPlace = super.newSvgPlace(modelPlace);
        this.activeTool.bindPlace(canvasPlace);
        return canvasPlace;
    }

    public updatePlace(newPlace: PlaceChange): void {
        const canvasPlace = this.elements.getPlace(newPlace.originalPlace?.id);
        if (!canvasPlace) {
            return;
        }
        this.elements.arcs.forEach(arc => arc.svgArc.setMultiplicity(this.multiplicityText(arc)));
        // TODO: NAB-351 check condition
        if (!newPlace.place && newPlace.originalPlace.id) {
            this.removeSvgPlace(canvasPlace);
            return;
        }
        const place = canvasPlace.svgPlace;
        place.changeId(newPlace.place.id);
        place.canvasElement.updateMarking(newPlace.place.marking);
        place.canvasElement.setLabelText(this.labelText(newPlace.place));
        this.elements.removePlace(newPlace.originalPlace?.id);
        this.elements.addPlace(canvasPlace);
    }

    public movePlace(place: CanvasPlace): void {
        this.modelService.movePlace(place.modelPlace, place.svgPlace.getPosition());
        place.svgPlace.move(new DOMPoint(place.modelPlace.x, place.modelPlace.y));
    }

    public removePlace(place: CanvasPlace): void {
        this.modelService.removePlace(place.modelPlace);
    }

    private removeSvgPlace(place: CanvasPlace) {
        this.canvas.removePlace(place.svgPlace.canvasElement);
        this.elements.removePlace(place.modelPlace.id);
    }

// TRANSITION

    createTransition(position: DOMPoint): CanvasTransition {
        const modelTransition = this.modelService.newTransition(position.x, position.y);
        return this.newSvgTransition(modelTransition);
    }

    public copyTransition(copy: CanvasTransition): CanvasTransition {
        const modelTransition = this.modelService.copyTransition(copy.modelTransition);
        return this.newSvgTransition(modelTransition);
    }

    public newSvgTransition(modelTransition: Transition): CanvasTransition {
        const canvasTransition = super.newSvgTransition(modelTransition);
        this.activeTool.bindTransition(canvasTransition);
        return canvasTransition;
    }

    public updateTransition(newTransition: ChangedTransition): void {
        const canvasTransition = this.elements.getTransition(newTransition.id);
        if (!canvasTransition) {
            return;
        }
        if (!newTransition.transition && newTransition.id) {
            this.removeSvgTransition(canvasTransition);
            return;
        }
        const transition = canvasTransition.svgTransition;
        transition.changeId(newTransition.transition.id);
        transition.setIcon(newTransition.transition.icon);
        transition.canvasElement.setLabelText(this.labelText(newTransition.transition));
        this.elements.removeTransition(newTransition.id);
        this.elements.addTransition(canvasTransition);
    }

    public moveTransition(transition: CanvasTransition): void {
        this.modelService.moveTransition(transition.modelTransition, transition.svgTransition.getPosition());
        transition.svgTransition.move(new DOMPoint(transition.modelTransition.x, transition.modelTransition.y));
    }

    public removeTransition(transition: CanvasTransition): void {
        this.modelService.removeTransition(transition.modelTransition);
    }

    private removeSvgTransition(transition: CanvasTransition) {
        this.canvas.removeTransition(transition.svgTransition.canvasElement);
        this.elements.removeTransition(transition.modelTransition.id);
    }

// ARC

    public createArc(source: NodeElement, destination: NodeElement, type: ArcType): CanvasArc {
        const modelArc = this.modelService.newArc(source, destination, type);
        return this.newSvgArc(modelArc);
    }

    public copyArc(copy: CanvasArc, sourceId: string, destinationId: string): CanvasArc {
        const modelArc = this.modelService.copyArc(copy.modelArc, sourceId, destinationId);
        return this.newSvgArc(modelArc);
    }

    public newSvgArc(modelArc: Arc<any, any>): CanvasArc {
        const canvasArc = super.newSvgArc(modelArc);
        this.activeTool.bindArc(canvasArc);
        return canvasArc;
    }

    public createArcBreakpoint(arc: CanvasArc, point: DOMPoint, index: number): void {
        arc.svgArc.getBreakPointList().splice(index, 0, point);
        this.modelService.newArcBreakpoint(arc.modelArc, point, index);
    }

    public moveArcBreakpoint(arc: CanvasArc, index: number): void {
        const breakPoint = arc.svgArc.getBreakPointList()[index];
        this.modelService.moveArcBreakpoint(arc.modelArc, index, breakPoint);
        breakPoint.x = arc.modelArc.breakpoints[index].x;
        breakPoint.y = arc.modelArc.breakpoints[index].y;
        arc.svgArc.element.updateLine();
    }

    public removeBreakpoint(arc: CanvasArc, index: number): void {
        this.modelService.removeArcBreakpoint(arc.modelArc, index);
        arc.removeBreakpoint(index);
        this.historyService.save(`Arc ${arc.id} breakpoint has been deleted.`);
    }

    private updateArc(changedArc: ChangedArc): void {
        const arc = this.elements.getArc(changedArc.id);
        if (!arc) {
            return;
        }
        if (!changedArc.arc && changedArc.id) {
            this.removeSvgArc(arc);
            return;
        }
        if (changedArc.arcType !== arc.modelArc.type) {
            arc.modelArc = this.model.getArc(changedArc.id);
            const oldSvgArc = arc.svgArc;
            arc.svgArc = this.arcFactory.buildSvgArc(changedArc.arcType, changedArc.id, oldSvgArc.element.start, oldSvgArc.element.end);
            this.canvas.removeArc(oldSvgArc.element);
            this.canvas.addArc(arc.svgArc.element);
            this.activeTool.bindArc(arc);
        }
        arc.svgArc.setMultiplicity(this.multiplicityText(arc));
    }

    createNewRegularPlaceTransitionArc(source: CanvasPlace, destination: CanvasTransition): CanvasArc {
        const modelArc = this.modelService.newArc(source.modelElement, destination.modelElement, ArcType.REGULAR_PT);
        return this.newSvgArc(modelArc);
    }

    createNewRegularTransitionPlaceArc(source: CanvasTransition, destination: CanvasPlace): CanvasArc {
        const modelArc = this.modelService.newArc(source.modelElement, destination.modelElement, ArcType.REGULAR_TP);
        return this.newSvgArc(modelArc);
    }

    public removeArc(arc: CanvasArc): void {
        this.modelService.removeArc(arc.modelArc);
    }

    private removeSvgArc(arc: CanvasArc) {
        this.canvas.removeArc(arc.svgArc.element);
        this.elements.removeArc(arc.modelArc.id);
    }

// TEMP ARC

    createTemporaryArc(position: DOMPoint, markerId: string): SVGElement {
        const arcLine = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'polyline') as SVGPolylineElement;
        arcLine.setAttributeNS(null, 'fill', 'none');
        arcLine.setAttributeNS(null, 'stroke', 'black');
        arcLine.setAttributeNS(null, 'stroke-width', '2');
        arcLine.setAttributeNS(null, 'marker-end', `url(#${markerId})`);
        arcLine.setAttributeNS(null, 'points', `${position.x},${position.y} ${position.x},${position.y}`);
        this.canvas.container.appendChild(arcLine);
        return arcLine;
    }

    removeTemporaryArc(line: SVGElement): void {
        this.canvas.container.removeChild(line);
    }

    moveTemporaryArc(arcLine: SVGElement, position: DOMPoint, source: PetriflowNode<any>): void {
        const intersect = source.canvasElement.getEdgeIntersection(position, 0);
        const xLineLength = position.x - intersect.x;
        const yLineLength = position.y - intersect.y;
        const arcLength = Math.sqrt(xLineLength * xLineLength + yLineLength * yLineLength);
        const arcLengthOffset = arcLength - CanvasConfiguration.ARROW_HEAD_SIZE;
        const arcRatio = arcLengthOffset / arcLength;
        const finalX = intersect.x + xLineLength * arcRatio;
        const finalY = intersect.y + yLineLength * arcRatio;
        arcLine.setAttributeNS(null, 'points', `${intersect.x},${intersect.y} ${finalX},${finalY}`);
    }

    // OTHER

    public createRectangle(position: DOMPoint): SVGRectElement {
        const rectangle = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'rect') as SVGRectElement;
        rectangle.setAttributeNS(null, 'class', 'lasso-selection');
        rectangle.setAttributeNS(null, 'x', `${position.x}`);
        rectangle.setAttributeNS(null, 'y', `${position.y}`);
        return rectangle;
    }

    public moveRectangle(lasso: SVGRectElement, selectionStart: DOMPoint, event: DOMPoint): void {
        const width = event.x - selectionStart.x;
        const height = event.y - selectionStart.y;
        const newX = width > 0 ? selectionStart.x : selectionStart.x + width;
        const newY = height > 0 ? selectionStart.y : selectionStart.y + height;
        lasso.setAttributeNS(null, 'width', `${Math.abs(width)}`);
        lasso.setAttributeNS(null, 'height', `${Math.abs(height)}`);
        lasso.setAttributeNS(null, 'x', `${newX}`);
        lasso.setAttributeNS(null, 'y', `${newY}`);
    }

    get historyService(): HistoryService {
        return this._historyService;
    }
}
