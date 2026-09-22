import {ComponentType} from '@angular/cdk/overlay';
import {NgZone} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {PetriNet} from '@netgrif/petriflow';
import {PetriflowCanvas, PetriflowCanvasService} from '@netgrif/petriflow.svg';
import {ControlPanelButton} from '../../control-panel/control-panel-button';
import {Tool} from '../../control-panel/tools/tool';
import {CanvasArc} from '../../edit-mode/domain/canvas-arc';
import {CanvasElementCollection} from '../../edit-mode/domain/canvas-element-collection';
import {CanvasObject} from '../../edit-mode/domain/canvas-object';
import {CanvasPlace} from '../../edit-mode/domain/canvas-place';
import {CanvasTransition} from '../../edit-mode/domain/canvas-transition';
import {Hotkey} from '../../edit-mode/services/modes/domain/hotkey';
import {ModelerConfig} from '../../modeler-config';
import {SelectedTransitionService} from '../../selected-transition.service';
import {ModelService} from '../model/model.service';
import {ArcListener} from './listeners/arc-listener';
import {ContextMenuInterruptionError} from './listeners/context-menu-interruption-error';
import {KeyListener} from './listeners/key-listener';
import {MouseListener} from './listeners/mouse-listener';
import {PlaceListener} from './listeners/place-listener';
import {TransitionListener} from './listeners/transition-listener';
import {ToolComponent} from "../../control-panel/tools/tool-component/tool.component";

export abstract class CanvasListenerTool extends Tool implements MouseListener, PlaceListener, TransitionListener, ArcListener, KeyListener {

    private static readonly clickMargin = 3;

    private readonly _modelService: ModelService;
    private readonly _dialog: MatDialog;
    private readonly _router: Router;
    private readonly _transitionService: SelectedTransitionService;
    private readonly _hotkeys: Array<Hotkey>;
    private _mouseDown: PointerEvent;

    protected constructor(
        id: string,
        button: ControlPanelButton,
        modelService: ModelService,
        dialog: MatDialog,
        router: Router,
        transitionService: SelectedTransitionService,
        private readonly _ngZone?: NgZone
    ) {
        super(id, button, ToolComponent);
        this._modelService = modelService;
        this._dialog = dialog;
        this._router = router;
        this._transitionService = transitionService;
        this._hotkeys = new Array<Hotkey>();
        this.hotkeys.push(new Hotkey('+', false, false, false, this.zoom.bind(this, 1)));
        this.hotkeys.push(new Hotkey('-', false, false, false, this.zoom.bind(this, -1)));
        this.hotkeys.push(new Hotkey('ArrowUp', false, false, false, this.move.bind(this, 0, ModelerConfig.SIZE)));
        this.hotkeys.push(new Hotkey('ArrowRight', false, false, false, this.move.bind(this, -ModelerConfig.SIZE, 0)));
        this.hotkeys.push(new Hotkey('ArrowDown', false, false, false, this.move.bind(this, 0, -ModelerConfig.SIZE)));
        this.hotkeys.push(new Hotkey('ArrowLeft', false, false, false, this.move.bind(this, ModelerConfig.SIZE, 0)));
        this.hotkeys.push(new Hotkey('Home', false, false, false, this.move.bind(this, 0, 0, false)));
    }

    /**
     * onpointermove fires at high frequency during panning/dragging. Registering it while running
     * outside the Angular zone keeps every mousemove (and the requestAnimationFrame panzoom schedules
     * internally to apply the transform) from triggering a full change-detection pass.
     */
    private runOutsideAngular(fn: () => void): void {
        if (this._ngZone) {
            this._ngZone.runOutsideAngular(fn);
        } else {
            fn();
        }
    }

    abstract get canvasService(): PetriflowCanvasService;

    abstract get elements(): CanvasElementCollection;

    abstract reset(): void;

    public bind(): void {
        this.bindPlaces(this.elements?.places);
        this.bindTransitions(this.elements?.transitions);
        this.bindArcs(this.elements?.arcs);
        this.bindCanvas(this.canvas);
        this.bindKeys();
    }

    public unbind(): void {
        if (!this.elements) {
            return;
        }
        this.unbindPlaces(this.elements.places);
        this.unbindTransitions(this.elements.transitions);
        this.unbindArcs(this.elements.arcs);
        this.unbindCanvas(this.canvas);
        this.unbindKeys();
    }

    bindKeys(): void {
        document.onkeydown = this.onKeyDown.bind(this);
        document.onkeyup = this.onKeyUp.bind(this);
    }

    unbindKeys(): void {
        document.onkeydown = undefined;
        document.onkeyup = undefined;
    }

    onKeyDown(event: KeyboardEvent): void {
        if (event.repeat) {
            return;
        }
        const hotkey = this._hotkeys.find(a => a.matches(event));
        if (!hotkey) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        hotkey.listener();
    }

    onKeyUp(event: KeyboardEvent): void {
    }

    bindPlaces(places: Array<CanvasPlace>): void {
        places.forEach(place => this.bindPlace(place));
    }

    bindPlace(place: CanvasPlace): void {
        place.svgPlace.canvasElement.container.onpointerdown = (e: PointerEvent) => this.handleEvent(this.onPlaceDown, e, place);
        place.svgPlace.canvasElement.container.onpointerup = (e: PointerEvent) => this.handleEvent(this.onPlaceUp, e, place);
        place.svgPlace.canvasElement.container.onpointerenter = (e: PointerEvent) => this.handleEvent(this.onPlaceEnter, e, place);
        place.svgPlace.canvasElement.container.onpointerleave = (e: PointerEvent) => this.handleEvent(this.onPlaceLeave, e, place);
        this.runOutsideAngular(() => {
            place.svgPlace.canvasElement.container.onpointermove = (e: PointerEvent) => this.handleEvent(this.onPlaceMove, e, place);
        });
    }

    unbindPlaces(places: Array<CanvasPlace>): void {
        places.forEach(place => this.unbindPlace(place));
    }

    unbindPlace(place: CanvasPlace): void {
        place.svgPlace.canvasElement.container.onpointerdown = undefined;
        place.svgPlace.canvasElement.container.onpointerup = undefined;
        place.svgPlace.canvasElement.container.onpointerenter = undefined;
        place.svgPlace.canvasElement.container.onpointerleave = undefined;
        place.svgPlace.canvasElement.container.onpointermove = undefined;
    }

    bindTransitions(transitions: Array<CanvasTransition>): void {
        transitions.forEach(transition => this.bindTransition(transition));
    }

    bindTransition(transition: CanvasTransition): void {
        transition.svgTransition.canvasElement.container.onpointerdown = (e: PointerEvent) => this.handleEvent(this.onTransitionDown, e, transition);
        transition.svgTransition.canvasElement.container.onpointerup = (e: PointerEvent) => this.handleEvent(this.onTransitionUp, e, transition);
        transition.svgTransition.canvasElement.container.onpointerenter = (e: PointerEvent) => this.handleEvent(this.onTransitionEnter, e, transition);
        transition.svgTransition.canvasElement.container.onpointerleave = (e: PointerEvent) => this.handleEvent(this.onTransitionLeave, e, transition);
        this.runOutsideAngular(() => {
            transition.svgTransition.canvasElement.container.onpointermove = (e: PointerEvent) => this.handleEvent(this.onTransitionMove, e, transition);
        });
    }

    unbindTransitions(transitions: Array<CanvasTransition>): void {
        transitions.forEach(transition => this.unbindTransition(transition));
    }

    unbindTransition(transition: CanvasTransition): void {
        transition.svgTransition.canvasElement.container.onpointerdown = undefined;
        transition.svgTransition.canvasElement.container.onpointerup = undefined;
        transition.svgTransition.canvasElement.container.onpointerenter = undefined;
        transition.svgTransition.canvasElement.container.onpointerleave = undefined;
        transition.svgTransition.canvasElement.container.onpointermove = undefined;
    }

    bindArcs(arcs: Array<CanvasArc>): void {
        arcs.forEach(arc => this.bindArc(arc));
    }

    bindArc(arc: CanvasArc): void {
        arc.svgArc.element.container.onpointerdown = (e: PointerEvent) => this.handleEvent(this.onArcDown, e, arc);
        arc.svgArc.element.container.onpointerup = (e: PointerEvent) => this.handleEvent(this.onArcUp, e, arc);
        arc.svgArc.element.container.onpointerenter = (e: PointerEvent) => this.handleEvent(this.onArcEnter, e, arc);
        arc.svgArc.element.container.onpointerleave = (e: PointerEvent) => this.handleEvent(this.onArcLeave, e, arc);
        this.runOutsideAngular(() => {
            arc.svgArc.element.container.onpointermove = (e: PointerEvent) => this.handleEvent(this.onArcMove, e, arc);
        });
    }

    unbindArcs(arcs: Array<CanvasArc>): void {
        arcs.forEach(arc => this.unbindArc(arc));
    }

    unbindArc(arc: CanvasArc): void {
        arc.svgArc.element.container.onpointerdown = undefined;
        arc.svgArc.element.container.onpointerup = undefined;
        arc.svgArc.element.container.onpointerenter = undefined;
        arc.svgArc.element.container.onpointerleave = undefined;
        arc.svgArc.element.container.onpointermove = undefined;
    }

    private bindCanvas(canvas: PetriflowCanvas): void {
        if (!canvas?.svg) {
            return;
        }
        canvas.svg.onpointerdown = (e: PointerEvent) => this.handleEvent(this.onMouseDown, e);
        canvas.svg.onpointerup = (e: PointerEvent) => this.handleEvent(this.onMouseUp, e);
        canvas.svg.onpointerenter = (e: PointerEvent) => this.handleEvent(this.onMouseEnter, e);
        canvas.svg.onpointerleave = (e: PointerEvent) => this.handleEvent(this.onMouseLeave, e);
        this.runOutsideAngular(() => {
            canvas.svg.onpointermove = (e: PointerEvent) => this.handleEvent(this.onMouseMove, e);
        });
        canvas.svg.oncontextmenu = (e: PointerEvent) => {
            e.preventDefault();
            e.stopPropagation();
        };
        document.onvisibilitychange = (ev: Event) => {
            this.onVisibilityChange();
        };
    }

    private unbindCanvas(canvas: PetriflowCanvas): void {
        if (!canvas?.svg) {
            return;
        }
        canvas.svg.onpointerdown = undefined;
        canvas.svg.onpointerup = undefined;
        canvas.svg.onpointerenter = undefined;
        canvas.svg.onpointerleave = undefined;
        canvas.svg.onpointermove = undefined;
        canvas.svg.oncontextmenu = undefined;
        document.onvisibilitychange = undefined;
    }

    onVisibilityChange(): void {
        this.reset();
    }

    onMouseDown(event: PointerEvent): void {
        this.mouseDown = event;
        this.panzoomDown(event);
    }

    onMouseUp(event: PointerEvent): void {
        this.panzoomUp(event);
    }

    onMouseMove(event: PointerEvent): void {
        this.panzoomMove(event);
    }

    onMouseEnter(event: PointerEvent): void {
    }

    onMouseLeave(event: PointerEvent): void {
    }

    onMouseOut(event: PointerEvent): void {
    }

    onMouseOver(event: PointerEvent): void {
    }

    onArcDown(event: PointerEvent, arc: CanvasArc): void {
        this.mouseDown = event;
        this.panzoomDown(event);
    }

    onArcUp(event: PointerEvent, arc: CanvasArc): void {
        this.panzoomUp(event);
    }

    onArcMove(event: PointerEvent, arc: CanvasArc): void {
        this.panzoomMove(event);
    }

    onArcEnter(event: PointerEvent, arc: CanvasArc): void {
        arc.svgArc.activate();
    }

    onArcLeave(event: PointerEvent, arc: CanvasArc): void {
        arc.svgArc.deselect();
    }

    onPlaceDown(event: PointerEvent, place: CanvasPlace): void {
        this.mouseDown = event;
        this.panzoomDown(event);
    }

    onPlaceUp(event: PointerEvent, place: CanvasPlace): void {
        this.panzoomUp(event);
    }

    onPlaceMove(event: PointerEvent, place: CanvasPlace): void {
        this.panzoomMove(event);
    }

    onPlaceEnter(event: PointerEvent, place: CanvasPlace): void {
        place.svgPlace.activate();
    }

    onPlaceLeave(event: PointerEvent, place: CanvasPlace): void {
        place.svgPlace.deactivate();
    }

    onTransitionDown(event: PointerEvent, transition: CanvasTransition): void {
        this.mouseDown = event;
        this.panzoomDown(event);
    }

    onTransitionUp(event: PointerEvent, transition: CanvasTransition): void {
        this.panzoomUp(event);
    }

    onTransitionMove(event: PointerEvent, transition: CanvasTransition): void {
        this.panzoomDown(event);
    }

    onTransitionEnter(event: PointerEvent, transition: CanvasTransition): void {
        transition.svgTransition.activate();
    }

    onTransitionLeave(event: PointerEvent, transition: CanvasTransition): void {
        transition.svgTransition.deactivate();
    }

    handleEvent(eventFunction: (...args: any[]) => void, e: PointerEvent, element?: CanvasObject<any, any>): void {
        try {
            eventFunction.call(this, e, element);
        } catch (e) {
            if (!(e instanceof ContextMenuInterruptionError)) {
                throw e;
            }
        }
    }

    panzoomDown(event: PointerEvent): void {
        this.panzoomHandle(event, () => {
            this.canvasService.panzoom.handleDown(event);
        });
    }

    panzoomUp(event: PointerEvent): void {
        this.panzoomHandle(event, () => {
            this.canvasService.panzoom.handleUp(event);
        });
    }

    panzoomMove(event: PointerEvent): void {
        this.panzoomHandle(event, () => {
            this.canvasService.panzoom.handleMove(event);
        });
    }

    panzoomHandle(event: PointerEvent, handle: () => void): void {
        event.stopPropagation();
        if (this.isMoveButton(event)) {
            handle();
        }
    }

    onClick(): void {
    }

    openDialog(dialog: ComponentType<any>, config: any, afterClose?: (value: any) => void): void {
        this.beforeDialog();
        this.dialog.open(dialog, config).afterClosed().subscribe(value => {
            if (afterClose) {
                afterClose(value);
            }
            this.afterDialog();
        });
    }

    protected beforeDialog(): void {
        this.unbindKeys();
    }

    protected afterDialog(): void {
        this.bindKeys();
        this.reset();
    }

    isLeftButton(event: PointerEvent): boolean {
        return event.button === 0 || (event.button === -1 && event.buttons === 1);
    }

    isWheelButton(event: MouseEvent): boolean {
        return event.button === 1 || (event.button === -1 && event.buttons === 4);
    }

    isRightButton(event: PointerEvent): boolean {
        return event.button === 2 || (event.button === -1 && event.buttons === 2);
    }

    isMoveButton(event: PointerEvent): boolean {
        return this.isRightButton(event) || this.isWheelButton(event);
    }

    mousePosition(event: PointerEvent): DOMPoint {
        return new DOMPoint(event.offsetX, event.offsetY);
    }

    windowMousePosition(event: PointerEvent): DOMPoint {
        return new DOMPoint(event.clientX, event.clientY);
    }

    move(horizontal: number, vertical: number, relative: boolean = true): void {
        this.canvasService.enablePanning();
        this.canvasService.panzoom?.pan(horizontal, vertical, {relative});
    }

    zoom(direction: number): void {
        this.canvasService.panzoom?.zoomToPoint(
            this.canvasService.panzoom?.getScale() + ModelerConfig.ZOOM_SPEED * direction,
            {
                clientX: 0,
                clientY: 0
            }
        );
    }

    isClick(event: PointerEvent): boolean {
        if (!this.mouseDown) {
            return false;
        }
        return Math.abs(event.x - this.mouseDown.x) < CanvasListenerTool.clickMargin &&
            Math.abs(event.y - this.mouseDown.y) < CanvasListenerTool.clickMargin;
    }

    public get modelService(): ModelService {
        return this._modelService;
    }

    public get model(): PetriNet {
        return this._modelService.model;
    }

    public get dialog(): MatDialog {
        return this._dialog;
    }

    get canvas(): PetriflowCanvas {
        return this.canvasService.canvas;
    }

    get router(): Router {
        return this._router;
    }

    get transitionService(): SelectedTransitionService {
        return this._transitionService;
    }

    get hotkeys(): Array<Hotkey> {
        return this._hotkeys;
    }

    get mouseDown(): PointerEvent {
        return this._mouseDown;
    }

    set mouseDown(value: PointerEvent) {
        this._mouseDown = value;
    }
}
