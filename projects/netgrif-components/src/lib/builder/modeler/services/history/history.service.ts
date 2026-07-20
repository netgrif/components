import {Injectable} from '@angular/core';
import {ExportService, PetriNet} from '@netgrif/petriflow';
import {Subject} from 'rxjs';
import {RedoTool} from '../../control-panel/modes/redo-tool';
import {UndoTool} from '../../control-panel/modes/undo-tool';
import {ModelerConfig} from '../../modeler-config';
import {ModelService} from '../model/model.service';
import {History} from './history';
import {HistoryChange} from './history-change';
import {LocalStorageService} from "../../../services/local-storage.service";

@Injectable()
export class HistoryService {

    private readonly _history: History<PetriNet>;
    private readonly _historyChange: Subject<HistoryChange<PetriNet>>;

    constructor(
        private modelService: ModelService,
        private exportService: ExportService,
        protected _localStorageService: LocalStorageService
    ) {
        this._history = new History<PetriNet>();
        this._historyChange = new Subject();
    }

    public save(message: string): void {
        this.modelService.model.lastChanged = Date.now();
        this.push(this.modelService.model.clone(), message);
    }

    public undo(): void {
        this.reloadModel(this._history.undo(), UndoTool.ID);
    }

    public redo(): void {
        this.reloadModel(this._history.redo(), RedoTool.ID);
    }

    public reload(model: PetriNet): void {
        this._history.head = this._history.memory.findIndex(value => value.record === model);
        this.reloadModel(model, '');
    }

    private reloadModel(model: PetriNet, message: string): PetriNet {
        if (model === undefined) {
            return undefined;
        }
        this.historyChange.next(HistoryChange.of(this._history, message));
        this.modelService.model = model.clone();
        return model;
    }

    private push(model: PetriNet, message: string): void {
        if (!model || model.lastChanged === this.currentModel?.lastChanged || this.history.memory.find(change =>
            change.record.lastChanged === model.lastChanged)
        ) {
            return;
        }
        const update = this._history.push(model, message);
        this.historyChange.next(update);
        this.saveToLocalStorage(model).then();
    }

    async saveToLocalStorage(model: PetriNet): Promise<void> {
        if (this._localStorageService.prefix === '') {
            this._localStorageService.setItem(ModelerConfig.LOCALSTORAGE.DRAFT_MODEL.KEY, this.exportService.exportXml(model));
            this._localStorageService.setItem(ModelerConfig.LOCALSTORAGE.DRAFT_MODEL.TIMESTAMP, new Date().toLocaleString());
            this._localStorageService.setItem(ModelerConfig.LOCALSTORAGE.DRAFT_MODEL.ID, `${model.id}`);
            this._localStorageService.setItem(ModelerConfig.LOCALSTORAGE.DRAFT_MODEL.TITLE, `${model.title.value}`);
        }
    }

    get historyChange(): Subject<HistoryChange<PetriNet>> {
        return this._historyChange;
    }

    get currentModel(): PetriNet {
        return this._history.record;
    }

    get history(): History<PetriNet> {
        return this._history;
    }
}
