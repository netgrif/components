import {Injectable, OnDestroy} from "@angular/core";
import {HistoryService} from "../modeler/services/history/history.service";
import {
    Case,
    EventOutcomeMessageResource,
    extractFieldValueFromData,
    LoadingEmitter,
    LoggerService,
    ProcessRefField,
    TaskEventOutcome,
    TaskResourceService
} from "@netgrif/components-core";
import {ExportService, PetriNet} from "@netgrif/petriflow";
import {HistoryChange} from "../modeler/services/history/history-change";
import {defer, EMPTY, Observable, of, Subject, Subscription} from 'rxjs';
import {catchError, concatMap, skip, tap} from 'rxjs/operators';
import {BuilderModeService} from "./builder-mode.service";

@Injectable()
export class BuilderIntegrationService implements OnDestroy {
    protected _isIntegrated: boolean;
    protected _processCase: Case;
    protected _dataField: ProcessRefField;
    protected _editTaskId: string;
    protected _isAssigned: boolean;
    protected _allowedTransIds: Array<string> = ['deploy', 't10', 't11', 't4', 't6', 't9', 'view'];

    protected _reloadCase: Subject<boolean>;
    protected _reloadModes: Subject<boolean>;
    protected _loading: LoadingEmitter;
    protected _historySub: Subscription;
    protected _modeSub: Subscription;
    protected _modelDataSet: Subject<PetriNet>;
    /**
     * The change of the model waiting to be saved: the whole XML of the model is sent to the process case, so a series of
     * changes (an import, a drag, typing) is saved once after a pause of the editing
     */
    protected _pendingSave: HistoryChange<PetriNet> | undefined;
    protected _saveTimer: ReturnType<typeof setTimeout> | undefined;
    /**
     * The writes of the model into the process case (the XML of a change, the model data) run one after the other in
     * the order they were requested: a later write is never overwritten by an earlier one that was answered later
     */
    protected _writes: Subject<Observable<unknown>>;
    /** the XML of the model in the process case (loaded or written last), an unchanged model is not written again */
    protected _savedXml: string | undefined;
    protected _writesSub: Subscription;
    protected static readonly SAVE_DELAY = 400;

    constructor(protected _historyService: HistoryService,
                protected _taskResourceService: TaskResourceService,
                protected _exportService: ExportService,
                protected _log: LoggerService,
                protected _builderModeService: BuilderModeService) {
        this._reloadCase = new Subject<boolean>();
        this._reloadModes = new Subject<boolean>();
        this._loading = new LoadingEmitter();
        this._modelDataSet = new Subject<PetriNet>();
        this._writes = new Subject<Observable<unknown>>();
        this._writesSub = this._writes.pipe(concatMap(write => write.pipe(catchError(() => EMPTY)))).subscribe();
        this._historySub = this._historyService.historyChange.subscribe(history => {
            if (this._isIntegrated && this._editTaskId && !_builderModeService.readOnly) {
                this.scheduleSave(history);
            }
        });
        // another mode (e.g. the Deploy task of the process case) works with the saved model
        this._modeSub = this._builderModeService.mode$().pipe(skip(1)).subscribe(() => this.flushSave());
    }

    /** saves the change after the pause of the editing ({@link SAVE_DELAY}), a newer change replaces it */
    protected scheduleSave(history: HistoryChange<PetriNet>) {
        this._pendingSave = history;
        clearTimeout(this._saveTimer);
        this._saveTimer = setTimeout(() => this.flushSave(), BuilderIntegrationService.SAVE_DELAY);
    }

    /** saves the waiting change of the model now */
    public flushSave() {
        clearTimeout(this._saveTimer);
        const history = this._pendingSave;
        this._pendingSave = undefined;
        if (!history) {
            return;
        }
        this.setData(history);
    }

    /** the write into the process case, after the assign of its edit task when it is not assigned yet */
    protected write(request: () => Observable<unknown>) {
        this._writes.next(defer(() => this._isAssigned
            ? request()
            : this._taskResourceService.assignTask(this._editTaskId).pipe(
                tap(result => this._isAssigned = !!result.success),
                concatMap(() => request()))));
    }

    ngOnDestroy(): any {
        this.flushSave();
        this._historySub?.unsubscribe();
        this._modeSub?.unsubscribe();
        // the writes already requested are finished (the queue is not unsubscribed), no new ones come
        this._writes.complete();
        this._modelDataSet.complete();
    }

    get isIntegrated(): boolean {
        return this._isIntegrated;
    }

    set isIntegrated(value: boolean) {
        this._isIntegrated = value;
    }

    get processCase(): Case {
        return this._processCase;
    }

    set processCase(value: Case) {
        this._processCase = value;
    }

    get dataField(): ProcessRefField {
        return this._dataField;
    }

    set dataField(dataField: ProcessRefField) {
        this._dataField = dataField;
    }

    get editTaskId(): string {
        return this._editTaskId;
    }

    set editTaskId(value: string) {
        this._editTaskId = value;
    }

    get reloadCase(): Observable<boolean> {
        return this._reloadCase.asObservable();
    }

    set reloadCase(value: boolean) {
        this._reloadCase.next(value);
    }

    get reloadModes(): Observable<boolean> {
        return this._reloadModes.asObservable();
    }

    set reloadModes(value: boolean) {
        this._reloadModes.next(value);
    }

    /**
     * Emits the model whose data (id, version, icon, title) were saved into the process case by {@link setModelData}
     * (after an import or an edit of the model), e.g. to update the title of the tab of the process
     */
    get modelDataSet$(): Observable<PetriNet> {
        return this._modelDataSet.asObservable();
    }

    get loading$(): Observable<boolean> {
        return this._loading.asObservable();
    }

    set allowedTransIds(value: Array<string>) {
        this._allowedTransIds = value;
    }

    get allowedTransIds(): Array<string> {
        return this._allowedTransIds;
    }

    public isLoading(): boolean {
        return this._loading.value;
    }

    /** the model was loaded from the process case: the same model is not written back (e.g. by the first history save) */
    public modelLoaded(model: PetriNet) {
        this._savedXml = this._exportService.exportXml(model);
    }

    protected setData(history: HistoryChange<PetriNet>) {
        const xml = this._exportService.exportXml(history.record);
        if (xml === this._savedXml) {
            return;
        }
        this._savedXml = xml;
        const body = {};
        body[this._editTaskId] = {};
        body[this._editTaskId]['xml_text'] = {
            type: 'text',
            value: xml
        };
        this.write(() => this._taskResourceService.setData(this._editTaskId, body).pipe(tap({
            next: (outcome: EventOutcomeMessageResource) => {
                if ((outcome.outcome as TaskEventOutcome)?.task?.user?.email !== undefined) {
                    this._isAssigned = true;
                }
                this._log.debug('Data set successfully');
            }, error: error => {
                this._log.error('Data set failed', error.message);
            }
        })));
    }

    public getXml(taskId = this._editTaskId): Observable<string> {
        if (!taskId) {
            this._log.debug('taskId is undefined, returning empty observable');
            return of('');
        }
        const xml = new Subject<string>();
        this._taskResourceService.getData(taskId).subscribe({
            next: dg => {
                try {
                    const xmlFieldValue = extractFieldValueFromData<string>(dg, 'xml_text');
                    xml.next(xmlFieldValue);
                    xml.complete();
                } catch (error) {
                    this._log.error('The model of the process case could not be loaded', error);
                    xml.error(error);
                }
            },
            error: error => xml.error(error)
        });
        return xml.asObservable();
    }

    public setModelData(model: PetriNet) {
        if (this._isIntegrated && this._editTaskId) {
            // the XML of the current model is sent here, the waiting change of the history is in it
            clearTimeout(this._saveTimer);
            this._pendingSave = undefined;
            const body = {};
            body[this._editTaskId] = {};
            body[this._editTaskId]['id'] = {
                type: 'text',
                value: model.id
            };
            body[this._editTaskId]['version'] = {
                type: 'text',
                value: model.version
            };
            body[this._editTaskId]['icon'] = {
                type: 'text',
                value: model.icon
            };
            body[this._editTaskId]['title'] = {
                type: 'text',
                value: model.title?.value
            };
            this._savedXml = this._exportService.exportXml(model);
            body[this._editTaskId]['xml_text'] = {
                type: 'text',
                value: this._savedXml
            };
            this._loading.next(true);
            this.write(() => this._taskResourceService.setData(this._editTaskId, body).pipe(tap({
                next: (outcome: EventOutcomeMessageResource) => {
                    this._loading.next(false);
                    if ((outcome.outcome as TaskEventOutcome)?.task?.user?.email !== undefined) {
                        this._isAssigned = true;
                    }
                    this._modelDataSet.next(model);
                    this._log.debug('Data set successfully');
                }, error: error => {
                    this._loading.next(false);
                    this._log.error('Data set failed', error.message);
                }
            })));
        }
    }
}
