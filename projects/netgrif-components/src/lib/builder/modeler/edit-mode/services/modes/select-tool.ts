import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {
    DialogPlaceRefDeleteComponent,
    PlaceRefDeleteData,
} from '../../../../dialogs/dialog-place-ref-delete/dialog-place-ref-delete.component';
import {ActionsMasterDetailService} from '../../../actions-mode/actions-master-detail.service';
import {ActionsModeService} from '../../../actions-mode/actions-mode.service';
import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {ModelerConfig} from '../../../modeler-config';
import {SelectedTransitionService} from '../../../selected-transition.service';
import {HistoryService} from '../../../services/history/history.service';
import {ModelService} from '../../../services/model/model.service';
import {ContextMenu} from '../../context-menu/context-menu';
import {DeleteMenuItem} from '../../context-menu/menu-items/delete-menu-item';
import {DeleteSelectedMenuItem} from '../../context-menu/menu-items/delete-selected-menu-item';
import {SelectArcsMenuItem} from '../../context-menu/menu-items/select-arcs-menu-item';
import {CanvasArc} from '../../domain/canvas-arc';
import {CanvasElementCollection} from '../../domain/canvas-element-collection';
import {CanvasNodeElement} from '../../domain/canvas-node-element';
import {CanvasObject} from '../../domain/canvas-object';
import {CanvasPlace} from '../../domain/canvas-place';
import {CanvasTransition} from '../../domain/canvas-transition';
import {EditModeService} from '../../edit-mode.service';
import {CanvasTool} from './canvas-tool';
import {Hotkey} from './domain/hotkey';
import {BuilderMode, BuilderModeService} from "../../../../builder-mode.service";

export class SelectTool extends CanvasTool {

    public static ID = 'SelectTool';

    private readonly _selectedElements: CanvasElementCollection;
    private readonly _clipboardElements: CanvasElementCollection;
    private ctrlDown = false;
    private clickElement: CanvasObject<any, any>;
    private lasso: SVGRectElement;
    private lastDragPoint: DOMPoint;
    private arcPointIndex: number;
    private lastClickTimestamp: number = 0;

    constructor(
        modelService: ModelService,
        dialog: MatDialog,
        editModeService: EditModeService,
        router: Router,
        transitionService: SelectedTransitionService,
        actionMode: ActionsModeService,
        actionsMasterDetail: ActionsMasterDetailService,
        private _historyService: HistoryService,
        private _builderModeService: BuilderModeService
    ) {
        super(
            SelectTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('cursor-default-outline', true),
                'Select tool',
            ),
            modelService,
            dialog,
            editModeService,
            router,
            transitionService,
            actionMode,
            actionsMasterDetail,
            _builderModeService
        );
        this._selectedElements = new CanvasElementCollection();
        this._clipboardElements = new CanvasElementCollection();
        this.hotkeys.push(new Hotkey('c', true, false, false, this.copyElements.bind(this)));
        this.hotkeys.push(new Hotkey('v', true, false, false, this.pasteElements.bind(this)));
        this.hotkeys.push(new Hotkey('d', true, false, false, this.duplicateElements.bind(this)));
        this.hotkeys.push(new Hotkey('a', true, false, false, this.selectAll.bind(this)));
        this.hotkeys.push(new Hotkey('z', true, false, true, this.redo.bind(this)));
        this.hotkeys.push(new Hotkey('z', true, false, false, this.undo.bind(this)));
        this.hotkeys.push(new Hotkey('Delete', false, false, false, this.deleteSelected.bind(this)));
    }

    bind(): void {
        super.bind();
        this.ctrlDown = false;
        this._selectedElements.clear();
        this._clipboardElements.clear();
    }

    unbind() {
        super.unbind();
        if (this.editModeService?.elements) {
            this.editModeService.elements.getAll().forEach(e => this.deactivate(e));
        }
    }

    reset() {
        super.reset();
        this.restart();
        this.selectedElements.clear();
        this.clipboardElements.clear();
        this.deselectAll();
    }

    restart(): void {
        if (this.lasso) {
            this.canvasService.canvas.container.removeChild(this.lasso);
        }
        this.lastDragPoint = undefined;
        this.mouseDown = undefined;
        this.lasso = undefined
        this.clickElement = undefined;
        this.arcPointIndex = undefined;
    }

    onKeyDown(event: KeyboardEvent): void {
        super.onKeyDown(event);
        this.ctrlDown = this.ctrlKey(event);
    }

    onKeyUp(event: KeyboardEvent): void {
        this.ctrlDown = this.ctrlKey(event);
    }

    private ctrlKey(event: KeyboardEvent): boolean {
        return (event.ctrlKey || event.metaKey || event.shiftKey);
    }

    copyElements(): void {
        this.clipboardElements.replaceAll(this._selectedElements);
    }

    pasteElements(): void {
        this.cloneElements(this.clipboardElements);
    }

    duplicateElements(): void {
        this.cloneElements(this.selectedElements);
    }

    private cloneElements(elements: CanvasElementCollection): void {
        const idMapping = new Map<string, string>();
        const copiedElements = new CanvasElementCollection();
        elements.places.forEach(p => {
            const place = this.editModeService.copyPlace(p);
            copiedElements.addPlace(place);
            idMapping.set(p.modelPlace.id, place.modelPlace.id);
        });
        elements.transitions.forEach(t => {
            const transition = this.editModeService.copyTransition(t);
            copiedElements.addTransition(transition);
            idMapping.set(t.modelTransition.id, transition.modelTransition.id);
        });
        elements.arcs.forEach(a => {
            const sourceId = idMapping.get(a.modelArc.source.id);
            const destinationId = idMapping.get(a.modelArc.destination.id);
            if (!sourceId || !destinationId) {
                return;
            }
            const arc = this.editModeService.copyArc(a, sourceId, destinationId);
            copiedElements.addArc(arc);
        });
        this.deselectAll();
        this.selectAll(copiedElements);
        this.historyService.save(`Elements (${copiedElements.totalSize()}) has been duplicated`);
    }

    selectAll(collection = this.editModeService.elements): void {
        this.selectedElements.replaceAll(collection);
        this.selectedElements.getAll().forEach(e => this.activate(e));
    }

    deselectAll(): void {
        this.deactivateAll();
        this.clearSelection();
    }

    deactivateAll(): void {
        this.elements.getAll().forEach(e => this.deactivate(e));
    }

    deleteSelected(): void {
        const referenced = this.selectedElements.places.filter(p => this.model.getArcs().some(a => a.reference === p.id));
        if (referenced.length === 0) {
            this.deleteElements();
            return;
        }
        const data = referenced.map(p => {
            return {
                place: p,
                arcs: this.model.getArcs().filter(a => a.reference === p.id)
            } as PlaceRefDeleteData;
        });
        this.dialog.open(DialogPlaceRefDeleteComponent, {data}).afterClosed().subscribe(value => {
            if (value === true) {
                this.deleteElements();
            }
        });
    }

    private deleteElements(): void {
        const size = this.selectedElements.totalSize();
        this.selectedElements.places.forEach(p => {
            this.deletePlace(p);
        });
        this.selectedElements.transitions.forEach(t => {
            this.deleteTransition(t);
        });
        this.selectedElements.arcs.forEach(a => {
            this.deleteArc(a);
        });
        this.deselectAll();
        this.historyService.save(`Elements have been deleted`);
    }

    undo(): void {
        this._historyService.undo();
    }

    redo(): void {
        this._historyService.redo();
    }

    onPlaceDown(event: PointerEvent, place: CanvasPlace) {
        super.onPlaceDown(event, place);
        this.onElementDown(event, place);
    }

    onPlaceUp(event: PointerEvent, place: CanvasPlace) {
        super.onPlaceUp(event, place);
        this.onElementUp(event, place, this.placeContextMenu(place, event));
    }

    onPlaceMove(event: PointerEvent, place: CanvasPlace) {
        super.onPlaceMove(event, place);
        this.onMove(event);
    }

    onTransitionDown(event: PointerEvent, transition: CanvasTransition): void {
        super.onTransitionDown(event, transition);
        this.onElementDown(event, transition);
    }

    onTransitionUp(event: PointerEvent, transition: CanvasTransition): void {
        super.onTransitionUp(event, transition);
        if (this.isDoubleClick(event) && this.isLeftButtonClick(event)) {
            this.transitionService.id = transition.id;
            this._builderModeService.mode = BuilderMode.FORM_BUILDER;
            return;
        }
        this.lastClickTimestamp = event.timeStamp;
        this.onElementUp(event, transition, this.transitionContextMenu(transition, event));
    }

    onTransitionMove(event: PointerEvent, transition: CanvasTransition) {
        super.onTransitionMove(event, transition);
        this.onMove(event);
    }

    onArcDown(event: PointerEvent, arc: CanvasArc) {
        super.onArcDown(event, arc);
        this.onElementDown(event, arc);
    }

    onArcUp(event: PointerEvent, arc: CanvasArc) {
        super.onArcUp(event, arc);
        this.onElementUp(event, arc, this.arcContextMenu(arc, event));
    }

    onArcMove(event: PointerEvent, arc: CanvasArc) {
        super.onArcMove(event, arc);
        this.onMove(event);
    }

    onMouseDown(event: PointerEvent) {
        super.onMouseDown(event);
        if (this.isLeftButton(event) && !this.isContextMenuOpen()) {
            this.deselectAll();
            this.lastDragPoint = this.mousePosition(event);
            this.lasso = this.editModeService.createRectangle(this.lastDragPoint);
            this.canvasService.canvas.container.appendChild(this.lasso);
        }
    }

    onMouseUp(event: PointerEvent) {
        super.onMouseUp(event);
        if (this.isLeftButton(event)) {
            if (this.lasso) {
                const lassoBox = this.getLassoBox();
                this.elements.getAll().filter(a => a.isWithin(lassoBox)).forEach(a => this.addToSelection(a));
            } else if (!this.selectedElements.isEmpty()) {
                this.moveSelected();
            }
        } else if (this.isRightButton(event)) {
            if (this.isClick(event)) {
                this.editModeService.contextMenuItems.next(
                    this.modelContextMenu(event)
                );
            }
        }
        this.restart();
    }

    onMouseMove(event: PointerEvent) {
        super.onMouseMove(event);
        this.onMove(event);
    }

    private onMove(event: PointerEvent): void {
        if (!this.isLeftButton(event) || this.ctrlDown) {
            return;
        }
        if (!!this.lasso) {
            const lassoBox = this.getLassoBox();
            this.editModeService.moveRectangle(this.lasso, this.lastDragPoint, this.mousePosition(event));
            this.elements.getAll().forEach(a => {
                if (a.isWithin(lassoBox)) {
                    this.activate(a);
                } else {
                    this.deactivate(a);
                }
            });
        } else if (this.clickElement) {
            if (this.isDraggingOnlyArc()) {
                const arc = this.clickElement as CanvasArc;
                const mousePosition = this.mousePosition(event);
                if (this.arcPointIndex === undefined) {
                    this.arcPointIndex = arc.findNearbyBreakpoint(mousePosition);
                }
                if (this.arcPointIndex !== undefined) {
                    arc.svgArc.getBreakPointList()[this.arcPointIndex].x = mousePosition.x;
                    arc.svgArc.getBreakPointList()[this.arcPointIndex].y = mousePosition.y;
                    arc.svgArc.element.updateLine();
                } else {
                    this.createNewBreakpoint(arc, mousePosition);
                }
            } else {
                const mousePosition = this.mousePosition(event);
                const dx = mousePosition.x - this.lastDragPoint.x;
                const dy = mousePosition.y - this.lastDragPoint.y;
                this.selectedElements.places.forEach(p => p.svgPlace.moveBy(dx, dy));
                this.selectedElements.transitions.forEach(t => t.svgTransition.moveBy(dx, dy));
                this.selectedElements.arcs.forEach(a => a.svgArc.moveBy(dx, dy));
                this.lastDragPoint = mousePosition;
            }
        }
    }

    private onElementDown(event: PointerEvent, element: CanvasObject<any, any>): void {
        // event.stopPropagation();
        this.closeContextMenu();
        this.mouseDown = event;
        if (!this.isLeftButton(event)) {
            return;
        }
        this.clickElement = element;
        this.lastDragPoint = this.mousePosition(event);
        if (this.selectedElements.isEmpty()) {
            this.addToSelection(element);
        } else {
            if (this.selectedElements.contains(element)) {
                if (this.ctrlDown) {
                    this.removeFromSelection(element);
                }
            } else {
                if (!this.ctrlDown) {
                    this.deselectAll();
                }
                this.addToSelection(element);
            }
        }
    }

    private onElementUp(event: PointerEvent, element: CanvasPlace | CanvasTransition | CanvasArc, contextMenu: ContextMenu): void {
        // event.stopPropagation();
        this.closeContextMenu();
        if (this.isLeftButton(event)) {
            if (!this.isClick(event)) {
                this.moveSelected();
            }
        } else if (this.isRightButton(event)) {
            event.stopPropagation();
            if (!this.selectedElements.contains(element)) {
                this.deselectAll();
            }
            this.addToSelection(element);
            this.editModeService.contextMenuItems.next(contextMenu);
        }
        this.restart();
    }

    private addToSelection(element: CanvasObject<any, any>): void {
        if (element instanceof CanvasArc) {
            this.selectedElements.addArc(element);
        } else if (element instanceof CanvasPlace) {
            this.selectedElements.addPlace(element);
        } else if (element instanceof CanvasTransition) {
            this.selectedElements.addTransition(element);
        }
        this.activate(element);
    }

    private removeFromSelection(element: CanvasObject<any, any>): void {
        if (element instanceof CanvasArc) {
            this.selectedElements.removeArc(element.modelArc.id);
        } else if (element instanceof CanvasPlace) {
            this.selectedElements.removePlace(element.modelPlace.id);
        } else if (element instanceof CanvasTransition) {
            this.selectedElements.removeTransition(element.modelTransition.id);
        }
        this.deactivate(element);
    }

    private activate(element: CanvasObject<any, any>): void {
        if (element instanceof CanvasArc) {
            element.svgObject.activate();
        } else if (element instanceof CanvasPlace) {
            element.svgObject.activate();
            element.svgPlace.canvasElement.element.style.cursor = 'move';
        } else if (element instanceof CanvasTransition) {
            element.svgObject.activate();
            element.svgTransition.canvasElement.element.style.cursor = 'move';
        }
    }

    private deactivate(element: CanvasObject<any, any>): void {
        if (element instanceof CanvasArc) {
            element.svgObject.deactivate();
        } else if (element instanceof CanvasPlace) {
            element.svgPlace.deactivate();
            element.svgPlace.canvasElement.element.style.cursor = 'default';
        } else if (element instanceof CanvasTransition) {
            element.svgObject.deactivate();
            element.svgTransition.canvasElement.element.style.cursor = 'default';
        }
    }

    private clearSelection(): void {
        this.selectedElements.getAll().forEach(p => this.removeFromSelection(p));
    }

    get selectedElements(): CanvasElementCollection {
        return this._selectedElements;
    }

    get clipboardElements(): CanvasElementCollection {
        return this._clipboardElements;
    }

    onPlaceLeave(event: PointerEvent, place: CanvasPlace) {
        if (this.selectedElements.contains(place)) {
            return;
        }
        super.onPlaceLeave(event, place);
    }

    onTransitionLeave(event: PointerEvent, transition: CanvasTransition) {
        if (this.selectedElements.contains(transition)) {
            return;
        }
        super.onTransitionLeave(event, transition);
    }

    onArcLeave(event: PointerEvent, arc: CanvasArc) {
        if (this.selectedElements.contains(arc)) {
            return;
        }
        super.onArcLeave(event, arc);
    }

    onMouseLeave(event: PointerEvent): void {
        if (this.mouseDown) {
            this.resetPosition();
            this.deactivateAll();
        }
        this.restart();
    }

    resetPosition(): void {
        this.selectedElements.places.forEach(p => p.svgPlace.move(new DOMPoint(p.modelPlace.x, p.modelPlace.y)));
        this.selectedElements.transitions.forEach(t => t.svgTransition.move(new DOMPoint(t.modelTransition.x, t.modelTransition.y)));
        this.selectedElements.arcs.forEach(a => {
            a.svgArc.getBreakPointList().forEach((bp, index) => {
                bp.x = a.modelArc.breakpoints[index].x;
                bp.y = a.modelArc.breakpoints[index].y;
            });
            a.svgArc.element.updateLine();
        });
    }

    moveSelected(): void {
        this.selectedElements.places.forEach(p => this.editModeService.movePlace(p));
        this.selectedElements.transitions.forEach(t => this.editModeService.moveTransition(t));
        this.selectedElements.arcs.forEach(a => {
            a.svgArc.getBreakPointList().forEach((bp, index) => {
                this.editModeService.moveArcBreakpoint(a, index);
            });
        });
        this.historyService.save(`Elements have been moved`);
    }

    isDraggingOnlyArc(): boolean {
        if (!(this.clickElement instanceof CanvasArc)) {
            return false;
        }
        return this.selectedElements.contains(this.clickElement) && this.selectedElements.totalSize() === 1;
    }

    private createNewBreakpoint(arc: CanvasArc, mousePosition: DOMPoint) {
        const linePoints = [arc.svgArc.element.start.position].concat(arc.svgArc.element.linePoints).concat(arc.svgArc.element.end.position);
        for (let i = 0; i < linePoints.length - 1; i++) {
            if (this.isBetween(linePoints[i], linePoints[i + 1], mousePosition)) {
                this.insertBreakpoint(arc, mousePosition, i);
                return;
            }
        }
        if (!this.arcPointIndex) {
            this.insertBreakpoint(arc, mousePosition, 0);
            return
        }
    }

    private insertBreakpoint(arc: CanvasArc, point: DOMPoint, index: number): void {
        this.arcPointIndex = index;
        this.editModeService.createArcBreakpoint(arc, point, index);
        this.historyService.save(`Breakpoint added to arc ${arc.id}`);
    }

    private isBetween(first: DOMPoint, second: DOMPoint, mouse: DOMPoint): boolean {
        const dx = second.x - first.x;
        const dy = second.y - first.y;
        const dxm = mouse.x - first.x;
        const dym = mouse.y - first.y;
        const arcLength = Math.sqrt(dx * dx + dy * dy);
        const toMouseLength = Math.sqrt(dxm * dxm + dym * dym);
        const ratio = toMouseLength / arcLength;
        const nx = first.x + dx * ratio;
        const ny = first.y + dy * ratio;
        return Math.abs(nx - mouse.x) <= 2 && Math.abs(ny - mouse.y) <= 2;
    }

    placeContextMenu(place: CanvasPlace, event: PointerEvent): ContextMenu {
        const menu = this.replaceDeleteMenuItem(super.placeContextMenu(place, event));
        menu.items.push(new SelectArcsMenuItem(this, place));
        return menu;
    }

    transitionContextMenu(transition: CanvasTransition, event: PointerEvent): ContextMenu {
        const menu = this.replaceDeleteMenuItem(super.transitionContextMenu(transition, event));
        menu.items.push(new SelectArcsMenuItem(this, transition));
        return menu;
    }

    arcContextMenu(arc: CanvasArc, event: PointerEvent): ContextMenu {
        return this.replaceDeleteMenuItem(super.arcContextMenu(arc, event));
    }

    selectConnectedArcs(element: CanvasNodeElement<any, any>) {
        const elementId = element.modelElement.id;
        const connected = this.elements.arcs.filter(a => a.modelArc.source.id === elementId || a.modelArc.destination.id === elementId);
        connected.forEach(a => this.addToSelection(a));
    }

    isDoubleClick(event: PointerEvent): boolean {
        return event.timeStamp - this.lastClickTimestamp < 300;
    }

    private replaceDeleteMenuItem(menuItem: ContextMenu): ContextMenu {
        const index = menuItem.items.findIndex(value => value instanceof DeleteMenuItem);
        if (index >= 0) {
            menuItem.items[index] = new DeleteSelectedMenuItem(this);
        }
        return menuItem;
    }

    private getLassoBox(): DOMRect {
        const overflow = ModelerConfig.SIZE / 4;
        const lassoBox = this.lasso.getBBox();
        return DOMRect.fromRect({
            x: lassoBox.x - overflow,
            y: lassoBox.y - overflow,
            width: lassoBox.width + 2 * overflow,
            height: lassoBox.height + 2 * overflow
        });
    }
}
