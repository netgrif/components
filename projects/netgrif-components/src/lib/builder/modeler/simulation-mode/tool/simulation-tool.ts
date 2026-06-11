import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {BasicSimulation, Place} from '@netgrif/petriflow';
import {PetriflowCanvasService} from '@netgrif/petriflow.svg';
import {
  Data,
  DataSet,
  DialogChangeDataComponent,
} from '../../../dialogs/dialog-change-data/dialog-change-data.component';
import {DialogMarkingChangeComponent} from '../../../dialogs/dialog-marking-change/dialog-marking-change.component';
import {PlaceEditData} from '../../../dialogs/dialog-place-edit/dialog-place-edit.component';
import {ControlPanelButton} from '../../control-panel/control-panel-button';
import {CanvasArc} from '../../edit-mode/domain/canvas-arc';
import {CanvasElementCollection} from '../../edit-mode/domain/canvas-element-collection';
import {CanvasPlace} from '../../edit-mode/domain/canvas-place';
import {CanvasTransition} from '../../edit-mode/domain/canvas-transition';
import {SelectedTransitionService} from '../../selected-transition.service';
import {CanvasListenerTool} from '../../services/canvas/canvas-listener-tool';
import {ModelService} from '../../services/model/model.service';
import {SimulationModeService} from '../simulation-mode.service';

export abstract class SimulationTool extends CanvasListenerTool {

    private readonly _simulationModeService: SimulationModeService;

    protected constructor(
        id: string,
        button: ControlPanelButton,
        modelService: ModelService,
        dialog: MatDialog,
        simulationModeService: SimulationModeService,
        router: Router,
        transitionService: SelectedTransitionService
    ) {
        super(id, button, modelService, dialog, router, transitionService);
        this._simulationModeService = simulationModeService;
    }

    bindTransition(transition: CanvasTransition) {
        super.bindTransition(transition);
        if (transition.svgTransition.iconElement) {
            transition.svgTransition.iconElement.onmouseenter = undefined;
            transition.svgTransition.iconElement.onmouseleave = undefined;
            transition.svgTransition.iconElement.onpointerenter = undefined;
            transition.svgTransition.iconElement.onpointerleave = undefined;
        }
    }

    onVisibilityChange() {
    }

    onTransitionEnter(event: MouseEvent, transition: CanvasTransition): void {
    }

    onTransitionLeave(event: MouseEvent, transition: CanvasTransition) {
    }

    onPlaceUp(event: PointerEvent, place: CanvasPlace) {
        super.onPlaceUp(event, place);
        // do not remove this setTimout - Windows user will not be happy (context menu problem)
        setTimeout(() => {
            this.openMarkingPlaceDialog(place.modelPlace);
        }, 0);
    }

    onPlaceEnter(event: MouseEvent, place: CanvasPlace) {
    }

    onPlaceLeave(event: MouseEvent, place: CanvasPlace) {
    }

    onArcUp(event: PointerEvent, arc: CanvasArc) {
        super.onArcUp(event, arc);
        const reference = arc.modelArc.reference;
        if (!reference) {
            return;
        }
        const value = this.simulationModeService.data.get(reference);
        if (value === undefined) {
            const place = this.simulationModeService.model.getPlace(reference);
            if (place) {
                setTimeout(() => {
                    this.openMarkingPlaceDialog(place);
                }, 0);
            }
        } else {
            setTimeout(() => {
                this.openDataDialog(reference, value);
            }, 0);
        }
    }

    openMarkingPlaceDialog(place: Place): void {
        this.openDialog(DialogMarkingChangeComponent, {
            width: '50%',
            panelClass: "dialog-width-50",
            data: {
                placeId: place.id
            } as PlaceEditData
        }, (data: number) => {
            if (data !== undefined) {
                place.marking = data;
                this.simulation.updatePlaceReferences();
                this.simulationModeService.renderModel(this.simulation.simulationModel);
            }
        });
    }

    openDataDialog(id: string, value: number): void {
        const dataSet = new Map<string, number>([[id, value]]);
        this.openDialog(DialogChangeDataComponent, {
            width: '50%',
            panelClass: "dialog-width-50",
            data: {
                dataSet: dataSet
            } as DataSet
        }, (data: Array<Data>) => {
            if (data) {
                this.simulationModeService.data.set(data[0].id, data[0].value);
                this.simulation.updateData(this.simulationModeService.data);
                this.simulationModeService.renderModel(this.simulation.simulationModel);
            }
        });
    }

    onArcEnter(event: MouseEvent, arc: CanvasArc) {
    }

    onArcLeave(event: MouseEvent, arc: CanvasArc) {
    }

    public reset(): void {
        this.simulation?.reset();
    }

    protected afterDialog() {
        this.bindKeys();
    }

    get canvasService(): PetriflowCanvasService {
        return this._simulationModeService.canvasService;
    }

    get elements(): CanvasElementCollection {
        return this._simulationModeService?.elements;
    }

    get simulationModeService(): SimulationModeService {
        return this._simulationModeService;
    }

    get simulation(): BasicSimulation {
        return this.simulationModeService.simulation;
    }
}
