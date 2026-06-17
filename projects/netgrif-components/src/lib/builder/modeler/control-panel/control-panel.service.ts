import {Injectable} from '@angular/core';
import {ActionsModeService} from '../actions-mode/actions-mode.service';
import {DataModeService} from '../data-mode/data-mode.service';
import {EditModeService} from '../edit-mode/edit-mode.service';
import {HistoryModeService} from '../history-mode/history-mode.service';
import {I18nModeService} from '../i18n-mode/i18n-mode.service';
import {RoleModeService} from '../role-mode/role-mode.service';
import {SimulationModeService} from '../simulation-mode/simulation-mode.service';
import {ExportTool} from './modes/export-tool';
import {ImportTool} from './modes/import-tool';
import {Mode} from './modes/mode';
import {ModeService} from './modes/mode-component/mode.service';
import {ModeRegistry} from './modes/mode-registry';
import {RedoTool} from './modes/redo-tool';
import {SvgExportTool} from './modes/svg-export-tool';
import {UndoTool} from './modes/undo-tool';
import {GlobalToolRegistry} from './tools/global-tool-registry';
import {Tool} from './tools/tool';
import {BuilderModeService} from "../../builder-mode.service";
import {TaskModeService} from "../task-mode/task-mode.service";
import {BuilderIntegrationService} from "../../builder-integration.service";

@Injectable()
export class ControlPanelService {

    private _modeRegistry: ModeRegistry;
    private _activeMode: Mode;
    private _defaultMode: Mode;

    constructor(
        private _editModeService: EditModeService,
        private _simulationModeService: SimulationModeService,
        private _dataModeService: DataModeService,
        private _roleModeService: RoleModeService,
        private _actionModeService: ActionsModeService,
        private _i18nModeService: I18nModeService,
        private _historyModeService: HistoryModeService,
        private _taskModeService: TaskModeService,
        private _globalToolRegistry: GlobalToolRegistry,
        private _importModelTool: ImportTool,
        private _exportModelTool: ExportTool,
        private _exportSvgTool: SvgExportTool,
        private _redoTool: RedoTool,
        private _undoTool: UndoTool,
        private _builderModeService: BuilderModeService,
        private _builderIntegrationService: BuilderIntegrationService
    ) {
        this.initialize();
        this._builderModeService.mode$().subscribe(mode => {
            const navigatedMode = this._modeRegistry.getItem(mode);
            if (!!navigatedMode) {
                this.activate(navigatedMode);
            }
        });
        this._builderIntegrationService.reloadModes.subscribe(() => {
            this.initialize();
        })
    }

    protected initialize() {
        this._modeRegistry = new ModeRegistry();
        this._globalToolRegistry.reset();
        if (this._builderIntegrationService.isIntegrated && this._builderIntegrationService.onlyTaskView) {
            this.initializeOnlyTaskMode();
        } else {
            this.initializeNormalMode();
        }
        this._defaultMode = this._builderIntegrationService.isIntegrated ? this._taskModeService.mode : this._editModeService.mode;

        this.activate();
        if (!this._builderIntegrationService.isIntegrated || !this._builderIntegrationService.onlyTaskView) {
            this._globalToolRegistry.registerItem(this._importModelTool);
            this._globalToolRegistry.registerItem(this._exportModelTool);
            this._globalToolRegistry.registerItem(this._exportSvgTool);
            this._globalToolRegistry.registerItem(this._undoTool);
            this._globalToolRegistry.registerItem(this._redoTool);
        }
    }

    protected initializeNormalMode() {
        if (this._builderIntegrationService.isIntegrated) {
            this.registerMode(this._taskModeService);
        }
        this.registerMode(this._editModeService);
        this.registerMode(this._simulationModeService);
        this.registerMode(this._dataModeService);
        this.registerMode(this._roleModeService);
        this.registerMode(this._actionModeService);
        this.registerMode(this._i18nModeService);
        this.registerMode(this._historyModeService);
    }

    protected initializeOnlyTaskMode() {
        this.registerMode(this._taskModeService);
        this.registerMode(this._simulationModeService);
    }

    // TODO: NAB-326 fix tool vs toolgroup and dividers problem
    private registerMode(modeService: ModeService<Tool>) {
        const mode = modeService.mode;
        if (!(mode.tools.getToolPortals()?.length > 0)) {
            modeService.tools.forEach(g => g.tools.forEach(t => mode.tools.registerItem(t, modeService)));
        }
        this._modeRegistry.registerItem(mode);
    }

    activate(mode?: Mode) {
        this.activeMode?.deactivate();
        if (mode === undefined) {
            this._activeMode = this._defaultMode;
        } else {
            this._activeMode = mode;
        }
        this.activeMode.activate();
    }

    get modeRegistry(): ModeRegistry {
        return this._modeRegistry;
    }

    isActive(id: string) {
        return this._activeMode?.id === id;
    }

    get activeMode(): Mode {
        return this._activeMode;
    }
}
