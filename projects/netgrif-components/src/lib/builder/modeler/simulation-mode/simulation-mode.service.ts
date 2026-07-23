import {Injectable, Injector, NgZone, Optional, Inject} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Arc, BasicSimulation, ImportUtils, PetriNet, Place, Transition} from '@netgrif/petriflow';
import {PetriflowCanvasService} from '@netgrif/petriflow.svg';
import {PanzoomOptions} from '@panzoom/panzoom';
import {BehaviorSubject} from 'rxjs';
import {InjectedTabData, NAE_TAB_DATA} from '@netgrif/components-core';
import {TutorialService} from '../../tutorial/tutorial-service';
import {ToolGroup} from '../control-panel/tools/tool-group';
import {ArcFactory} from '../edit-mode/domain/arc-builders/arc-factory.service';
import {CanvasArc} from '../edit-mode/domain/canvas-arc';
import {CanvasPlace} from '../edit-mode/domain/canvas-place';
import {CanvasTransition} from '../edit-mode/domain/canvas-transition';
import {SelectedTransitionService} from '../selected-transition.service';
import {CanvasModeService} from '../services/canvas/canvas-mode-service';
import {ModelService} from '../services/model/model.service';
import {SimulationMode} from './simulation-mode';
import {ChangeDataTool} from './tool/change-data-tool';
import {EventSimulationTool} from './tool/event-simulation.tool';
import {GridTool} from './tool/grid-tool';
import {ResetPositionAndZoomTool} from './tool/reset-position-and-zoom-tool';
import {ResetSimulationTool} from './tool/reset-simulation.tool';
import {SimulationTool} from './tool/simulation-tool';
import {SwitchLabelTool} from './tool/switch-label-tool';
import {TaskSimulationTool} from './tool/task-simulation.tool';

@Injectable()
export class SimulationModeService extends CanvasModeService<SimulationTool> {

    private _simulation: BasicSimulation;
    private _data: Map<string, number>;
    public originalModel: BehaviorSubject<PetriNet>;
// TODO: NAB-326 refactor
    public switchTools: ToolGroup<SimulationTool>;
    private _onTransitionDraw: (t: CanvasTransition) => void;
    /**
     * `noBind` is required here: pointer events are wired up manually through {@link CanvasListenerTool}
     * (same as in edit mode). Without it, Panzoom binds its own raw `document` pointermove/pointerup
     * listeners outside Angular's knowledge, which run on every mouse movement on the whole page.
     */
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
        protected _arcFactory: ArcFactory,
        protected _modelService: ModelService,
        protected _canvasService: PetriflowCanvasService,
        dialog: MatDialog,
        router: Router,
        transitionService: SelectedTransitionService,
        private tutorialService: TutorialService,
        private parentInjector: Injector,
        private _ngZone: NgZone,
        @Optional() @Inject(NAE_TAB_DATA) _tabData?: InjectedTabData,
    ) {
        super(_arcFactory, _modelService, _canvasService, _tabData);
        this._data = new Map<string, number>();
        this.mode = new SimulationMode(
            this.tutorialService.simulator,
            this.parentInjector,
        );
        this.onTransitionDraw = (_: CanvasTransition) => {
        };
        this.multiplicityText = (a: CanvasArc) => {
            if (!!a.modelArc.reference) {
                let multiplicity = 0;
                if (this.data.has(a.modelArc.reference)) {
                    multiplicity = this.data.get(a.modelArc.reference);
                } else {
                    multiplicity = this._modelService.getReferenceValue(a.modelArc.reference, this.model);
                }
                return `${a.modelArc.reference} (${multiplicity})`;
            }
            if (a.modelArc.multiplicity > 1) {
                return `${a.modelArc.multiplicity}`;
            }
            return '';
        };
        this.defaultTool = new TaskSimulationTool(this._modelService, dialog, this, router, transitionService, this._ngZone);
        this.switchTools = new ToolGroup<SimulationTool>(
            new ResetSimulationTool(this._modelService, dialog, this, router, transitionService, this._ngZone),
            new ChangeDataTool(this._modelService, dialog, this, router, transitionService, this._ngZone),
            new ResetPositionAndZoomTool(this._modelService, dialog, this, router, transitionService, this._ngZone),
            new GridTool(this._modelService, dialog, this, router, transitionService, this._ngZone),
            new SwitchLabelTool(this._modelService, dialog, this, router, transitionService, this._ngZone),
        );
        this.switchTools.tools.forEach(t => t.bind());
        this.tools = [
            new ToolGroup<SimulationTool>(
                this.defaultTool,
                new EventSimulationTool(this._modelService, dialog, this, router, transitionService, this._ngZone),
            ),
            this.switchTools,
        ];
        this.originalModel = new BehaviorSubject<PetriNet>(this._modelService.model.clone());
        this.originalModel.subscribe(model => {
            this.data = new Map(model.getArcs().filter(a => !!a.reference && !!model.getData(a.reference))
                .map(a => {
                    const data = model.getData(a.reference);
                    if (ImportUtils.isInitValueNumber(data.init)) {
                        return [a.reference, Number.parseInt(data.init.value, 10)];
                    }
                    return [a.reference, 0];
                }));
            this.simulation = new BasicSimulation(model, this.data);
            this.renderModel(model);
        });
    }

    renderModel(model: PetriNet = this.originalModel.value) {
        super.renderModel(model);
    }

    activate(tool?: SimulationTool) {
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

    public newSvgTransition(modelTransition: Transition): CanvasTransition {
        const canvasTransition = super.newSvgTransition(modelTransition);
        this.activeTool.bindTransition(canvasTransition);
        this._onTransitionDraw(canvasTransition);
        return canvasTransition;
    }

    newSvgPlace(modelPlace: Place): CanvasPlace {
        const place = super.newSvgPlace(modelPlace);
        this.activeTool.bindPlace(place);
        return place;
    }

    public newSvgArc(modelArc: Arc<any, any>): CanvasArc {
        const arc = super.newSvgArc(modelArc);
        this.activeTool.bindArc(arc);
        return arc;
    }

    set onTransitionDraw(value: (t: CanvasTransition) => void) {
        this._onTransitionDraw = value;
    }

    get simulation(): BasicSimulation {
        return this._simulation;
    }

    set simulation(value: BasicSimulation) {
        this._simulation = value;
    }

    get data(): Map<string, number> {
        return this._data;
    }

    set data(value: Map<string, number>) {
        this._data = value;
    }

    get model(): PetriNet {
        return this.simulation.simulationModel;
    }
}
