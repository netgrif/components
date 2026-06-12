import {PetriflowCanvasService} from '@netgrif/petriflow.svg';
import {ActionsMasterDetailService} from '../../../actions-mode/actions-master-detail.service';
import {ActionsModeService} from '../../../actions-mode/actions-mode.service';
import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {CanvasListenerTool} from '../../../services/canvas/canvas-listener-tool';
import {ContextMenuInterruptionError} from '../../../services/canvas/listeners/context-menu-interruption-error';
import {HistoryService} from '../../../services/history/history.service';
import {ContextMenu} from '../../context-menu/context-menu';
import {DeleteArcMenuItem} from '../../context-menu/menu-items/arc/delete-arc-menu-item';
import {DeleteBreakpointMenuItem} from '../../context-menu/menu-items/arc/delete-breakpoint-menu-item';
import {EditArcMenuItem} from '../../context-menu/menu-items/arc/edit-arc-menu-item';
import {EditModelMenuItem} from '../../context-menu/menu-items/model/edit-model-menu-item';
import {ManageModelPermissionsMenuItem} from '../../context-menu/menu-items/model/manage-model-permissions-menu-item';
import {DeletePlaceMenuItem} from '../../context-menu/menu-items/place/delete-place-menu-item';
import {EditPlaceMenuItem} from '../../context-menu/menu-items/place/edit-place-menu-item';
import {DeleteTransitionMenuItem} from '../../context-menu/menu-items/transition/delete-transition-menu-item';
import {EditFormMenuItem} from '../../context-menu/menu-items/transition/edit-form-menu-item';
import {
    EditTransitionActionsMenuItem,
} from '../../context-menu/menu-items/transition/edit-transition-actions-menu-item';
import {EditTransitionMenuItem} from '../../context-menu/menu-items/transition/edit-transition-menu-item';
import {
    EditTransitionPermissionsMenuItem,
} from '../../context-menu/menu-items/transition/edit-transition-permissions-menu-item';
import {CanvasArc} from '../../domain/canvas-arc';
import {CanvasElementCollection} from '../../domain/canvas-element-collection';
import {CanvasPlace} from '../../domain/canvas-place';
import {CanvasTransition} from '../../domain/canvas-transition';
import {EditModeService} from '../../edit-mode.service';
import {Hotkey} from './domain/hotkey';
import {BuilderModeService} from '../../../../builder-mode.service';
import {CanvasToolContext} from './canvas-tool-context';

export abstract class CanvasTool extends CanvasListenerTool {

    private readonly _editModeService: EditModeService;
    public actionMode: ActionsModeService;
    public actionsMasterDetail: ActionsMasterDetailService;
    public builderModeService: BuilderModeService;

    protected constructor(
        id: string,
        button: ControlPanelButton,
        context: CanvasToolContext,
    ) {
        super(id, button, context.modelService, context.dialog, context.router, context.transitionService);
        this._editModeService = context.editModeService;
        this.actionMode = context.actionMode;
        this.actionsMasterDetail = context.actionsMasterDetail;
        this.builderModeService = context.builderModeService;
        this.hotkeys.push(new Hotkey('Escape', false, false, false, () => {
            this.closeContextMenu();
            this.reset();
        }));
    }

    isWorkInProgress(): boolean {
        return false;
    }

    bind() {
        super.bind();
    }

    unbind() {
        super.unbind();
        this.closeContextMenu();
    }

    reset(): void {
    }

    onMouseLeave(event: PointerEvent): void {
        this.reset();
    }

    onMouseUp(event: PointerEvent) {
        super.onMouseUp(event);
        if (this.isRightButtonClick(event)) {
            this.openContextMenu(this.modelContextMenu(event));
        } else {
            this.closeContextMenuOnClick();
        }
    }

    onPlaceUp(event: PointerEvent, place: CanvasPlace) {
        super.onPlaceUp(event, place);
        if (this.isRightButtonClick(event)) {
            this.openContextMenu(this.placeContextMenu(place, event));
        } else {
            this.closeContextMenuOnClick();
        }
    }

    onTransitionUp(event: PointerEvent, transition: CanvasTransition) {
        super.onTransitionUp(event, transition);
        if (this.isRightButtonClick(event)) {
            this.openContextMenu(this.transitionContextMenu(transition, event));
        } else {
            this.closeContextMenuOnClick();
        }
    }

    onArcUp(event: PointerEvent, arc: CanvasArc) {
        super.onArcUp(event, arc);
        if (this.isRightButtonClick(event)) {
            this.openContextMenu(this.arcContextMenu(arc, event));
        } else {
            this.closeContextMenuOnClick();
        }
    }

    onClick() {
        super.onClick();
        this.closeContextMenu();
    }

    closeContextMenuOnClick(): void {
        if (this.isContextMenuOpen()) {
            this.closeContextMenu();
            throw new ContextMenuInterruptionError();
        }
    }

    isContextMenuOpen(): boolean {
        return this.editModeService.contextMenuItems.value !== undefined;
    }

    deletePlace(place: CanvasPlace): void {
        this.editModeService.removePlace(place);
    }

    deleteTransition(transition: CanvasTransition): void {
        this.editModeService.removeTransition(transition);
    }

    deleteArc(arc: CanvasArc): void {
        this.editModeService.removeArc(arc);
    }

    closeContextMenu(): void {
        this.editModeService.contextMenuItems?.next(undefined);
    }

    placeContextMenu(place: CanvasPlace, event: PointerEvent): ContextMenu {
        return new ContextMenu(
            [
                new EditPlaceMenuItem(place, this),
                new DeletePlaceMenuItem(place, this)
            ],
            this.windowMousePosition(event)
        );
    }

    transitionContextMenu(transition: CanvasTransition, event: PointerEvent): ContextMenu {
        return new ContextMenu(
            [
                new EditTransitionMenuItem(transition, this),
                new EditFormMenuItem(transition, this),
                new EditTransitionPermissionsMenuItem(transition, this),
                new EditTransitionActionsMenuItem(transition, this),
                new DeleteTransitionMenuItem(transition, this)
            ],
            this.windowMousePosition(event)
        )
    }

    arcContextMenu(arc: CanvasArc, event: PointerEvent): ContextMenu {
        const canvasPosition = this.mousePosition(event);
        const windowPosition = this.windowMousePosition(event);
        const breakPointIndex = arc.findNearbyBreakpoint(canvasPosition);

        const items = [];
        items.push(new EditArcMenuItem(arc, this));
        if (breakPointIndex !== undefined) {
            items.push(new DeleteBreakpointMenuItem(arc, breakPointIndex, this));
        }
        items.push(new DeleteArcMenuItem(arc, this));

        return new ContextMenu(
            items,
            windowPosition
        );
    }

    modelContextMenu(event: PointerEvent): ContextMenu {
        return new ContextMenu([
            new EditModelMenuItem(this),
            new ManageModelPermissionsMenuItem(this)
        ], this.windowMousePosition(event));
    }

    openContextMenu(menu: ContextMenu): void {
        if (this.isWorkInProgress()) {
            return;
        }
        this.editModeService.contextMenuItems?.next(menu);
    }

    isLeftButtonClick(event: PointerEvent): boolean {
        return this.isClick(event) && this.isLeftButton(event);
    }

    isRightButtonClick(event: PointerEvent): boolean {
        return this.isClick(event) && this.isRightButton(event);
    }

    get canvasService(): PetriflowCanvasService {
        return this.editModeService.canvasService;
    }

    get elements(): CanvasElementCollection {
        return this.editModeService.elements;
    }

    get editModeService(): EditModeService {
        return this._editModeService;
    }

    get historyService(): HistoryService {
        return this.editModeService.historyService;
    }
}
