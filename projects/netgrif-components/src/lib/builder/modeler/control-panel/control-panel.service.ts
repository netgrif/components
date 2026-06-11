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
import {BuilderMode, BuilderModeService} from "../../builder-mode.service";

@Injectable()
export class ControlPanelService {

    private readonly _modeRegistry: ModeRegistry;
    private _activeMode: Mode;
    private readonly _defaultMode: Mode;

    constructor(
        private _editModeService: EditModeService,
        private _simulationModeService: SimulationModeService,
        private _dataModeService: DataModeService,
        private _roleModeService: RoleModeService,
        private _actionModeService: ActionsModeService,
        private _i18nModeService: I18nModeService,
        private _historyModeService: HistoryModeService,
        private _globalToolRegistry: GlobalToolRegistry,
        private _importModelTool: ImportTool,
        private _exportModelTool: ExportTool,
        private _exportSvgTool: SvgExportTool,
        private _redoTool: RedoTool,
        private _undoTool: UndoTool,
        private _builderModeService: BuilderModeService
    ) {
        this._modeRegistry = new ModeRegistry();
        this.registerMode(_editModeService);
        this.registerMode(_simulationModeService);
        this.registerMode(_dataModeService);
        this.registerMode(_roleModeService);
        this.registerMode(_actionModeService);
        this.registerMode(_i18nModeService);
        this.registerMode(_historyModeService);
        this._defaultMode = _editModeService.mode;
        this.activate();
        this._globalToolRegistry.registerItem(_importModelTool);
        this._globalToolRegistry.registerItem(_exportModelTool);
        this._globalToolRegistry.registerItem(_exportSvgTool);
        this._globalToolRegistry.registerItem(_undoTool);
        this._globalToolRegistry.registerItem(_redoTool);
        this._builderModeService.mode$().subscribe(mode => {
            const navigatedMode = this._modeRegistry.getItem(mode);
            if (!!navigatedMode) {
                this.activate(navigatedMode);
            }
        });
    }

    // TODO: NAB-326 fix tool vs toolgroup and dividers problem
    private registerMode(modeService: ModeService<Tool>) {
        const mode = modeService.mode;
        modeService.tools.forEach(g => g.tools.forEach(t => mode.tools.registerItem(t, modeService)));
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
