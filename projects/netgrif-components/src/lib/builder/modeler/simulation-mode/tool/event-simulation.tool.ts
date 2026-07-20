import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ControlPanelButton} from '../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../control-panel/control-panel-icon';
import {CanvasTransition} from '../../edit-mode/domain/canvas-transition';
import {SelectedTransitionService} from '../../selected-transition.service';
import {ModelService} from '../../services/model/model.service';
import {SimulationModeService} from '../simulation-mode.service';
import {SimulationTool} from './simulation-tool';

export class EventSimulationTool extends SimulationTool {

    constructor(
        modelService: ModelService,
        dialog: MatDialog,
        simulationModeService: SimulationModeService,
        router: Router,
        transitionService: SelectedTransitionService
    ) {
        super(
            'event_simulation',
            new ControlPanelButton(
                new ControlPanelIcon('fast_forward', false, true),
                'Simulation by Events'
            ),
            modelService,
            dialog,
            simulationModeService,
            router,
            transitionService
        );
    }

    bind(): void {
        super.bind();
        this.simulationModeService.onTransitionDraw = (t: CanvasTransition) => {
            const firing = this.simulation.isAssigned(t.id);
            if (this.simulation.isEnabled(t.id)) {
                t.svgTransition.enable(firing);
            } else {
                t.svgTransition.disable(firing);
            }
        };
        this.simulationModeService.renderModel(this.simulation.simulationModel);
    }

    bindTransition(transition: CanvasTransition) {
        super.bindTransition(transition);
        transition.svgTransition.cancelArrow.onpointerup = (e) => this.onCancelClick(e, transition);
        transition.svgTransition.finishArrow.onpointerup = (e) => this.onFinishClick(e, transition);
    }

    unbindTransition(transition: CanvasTransition) {
        super.unbindTransition(transition);
        transition.svgTransition.cancelArrow.onpointerup = undefined;
        transition.svgTransition.finishArrow.onpointerup = undefined;
        if (this.isAssigned(transition)) {
            this.simulation.cancel(transition.id);
        }
    }

    onTransitionUp(event: PointerEvent, transition: CanvasTransition): void {
        super.onTransitionUp(event, transition);
        if (this.isLeftButton(event) && this.canBeAssigned(transition)) {
            this.assign(transition, event);
        }
    }

    onCancelClick(event: PointerEvent, transition: CanvasTransition): void {
        event.stopPropagation();
        if (this.isLeftButton(event) && this.isAssigned(transition)) {
            this.cancel(transition, event);
        }
    }

    onFinishClick(event: PointerEvent, transition: CanvasTransition): void {
        event.stopPropagation();
        if (this.isLeftButton(event) && this.isAssigned(transition)) {
            this.finish(transition, event);
        }
    }

    private canBeAssigned(t: CanvasTransition): boolean {
        return this.simulation.isEnabled(t.id) && !this.simulation.isAssigned(t.id);
    }

    private isAssigned(t: CanvasTransition): boolean {
        return this.simulation.isAssigned(t.id);
    }

    private assign(t: CanvasTransition, event: MouseEvent): void {
        this.simulate(() => {
            this.simulation.assign(t.id);
        }, event);
    }

    private cancel(t: CanvasTransition, event: MouseEvent): void {
        this.simulate(() => {
            this.simulation.cancel(t.id);
        }, event);
    }

    private finish(t: CanvasTransition, event: MouseEvent): void {
        this.simulate(() => {
            this.simulation.finish(t.id);
        }, event);
    }

    private simulate(event: () => void, e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        event();
        this.simulationModeService.renderModel(this.simulation.simulationModel);
    }
}
